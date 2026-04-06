const fs = require('fs');

async function fetchJobs() {
    let apiKey = '';
    try {
        const envContent = fs.readFileSync('.env.local', 'utf-8');
        const match = envContent.match(/RAPIDAPI_KEY=(.+)/);
        if (match && match[1]) {
            apiKey = match[1].trim();
        }
    } catch (err) {
        console.error("Could not read .env.local", err);
    }

    if (!apiKey) {
        console.error("No RAPIDAPI_KEY found in .env.local!");
        return;
    }
    
    const host = 'jsearch.p.rapidapi.com';
    let allJobs = [];
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': host
        }
    };

    try {
        console.log("Fetching India jobs from JSearch API...");
        
        const queries = [
            "software engineer in india",
            "data scientist OR data analyst in india",
            "intern in india",
            "product manager in india"
        ];
        
        for (const query of queries) {
            console.log(`Fetching jobs for: ${query}`);
            const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=10&country=in&date_posted=month`;
            
            const response = await fetch(url, options);
            if (!response.ok) {
                console.error(`Error for ${query}: ${response.status}`);
                continue;
            }
            
            const result = await response.json();
            
            if (result.data && Array.isArray(result.data)) {
                const mapped = result.data.map(job => ({
                    id: job.job_id || Math.random().toString(),
                    title: job.job_title || "Software Engineer",
                    organization: job.employer_name || "Company",
                    employment_type: [job.job_employment_type || "FULL_TIME"],
                    locations_derived: [
                        [job.job_city, job.job_state, job.job_country].filter(Boolean).join(", ") || "India"
                    ],
                    description_text: job.job_description || "",
                    url: job.job_apply_link || "#",
                    source_domain: job.job_publisher || "JSearch",
                    date_created: job.job_posted_at_datetime_utc || new Date().toISOString(),
                    salary_raw: (job.job_min_salary && job.job_max_salary) ? 
                        `${job.job_min_salary} - ${job.job_max_salary} ${job.job_salary_currency || 'INR'} / ${job.job_salary_period || 'MONTH'}` : 
                        null
                }));
                allJobs = allJobs.concat(mapped);
            }
            // slight delay to prevent rate limiting
            await new Promise(r => setTimeout(r, 1000));
        }

        if (!fs.existsSync('app/data')) {
            fs.mkdirSync('app/data', { recursive: true });
        }
        
        // Save combined jobs
        fs.writeFileSync('app/data/jobs.json', JSON.stringify(allJobs, null, 2));
        console.log(`Successfully mapped and saved ${allJobs.length} India jobs to app/data/jobs.json`);
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}

fetchJobs();
