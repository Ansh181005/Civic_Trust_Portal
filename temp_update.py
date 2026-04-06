import os
import re

log_path = r"C:\Users\ANSH\.gemini\antigravity\brain\3e212b6d-7160-408e-83c1-1b70deea31b5\.system_generated\logs\overview.txt"
with open(log_path, 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find("const scholarships = [")
if start == -1:
    print("Could not find start")
    exit(1)

sub = content[start:]
end = sub.find("];\n")
if end == -1:
    print("Could not find end")
    exit(1)

array_code = sub[:end+2]

# Insert types
array_code = array_code.replace("const scholarships = [", "export const scholarships: ScholarshipEntry[] = [")

target_path = r"d:\college\SEM-6\PM\civic-final\app\data\scholarships.ts"
with open(target_path, 'r', encoding='utf-8') as f:
    target_content = f.read()

interface_str = """export interface ScholarshipEntry {
  id: number;
  name: string;
  provider: string;
  category: string[];
  description: string;
  amount: string;
  deadline: string;
  status: string;
  eligibility: string;
  applyLink: string;
}

"""

# Regex substitute the old interface and array
new_target = re.sub(
    r"export interface ScholarshipEntry.*?\];",
    interface_str + array_code,
    target_content,
    flags=re.DOTALL
)

with open(target_path, 'w', encoding='utf-8') as f:
    f.write(new_target)

print("Successfully replaced.")
