import re

# Read the file
with open(r'e:\forinit-_-dia---autonomous-ai-data-ops (2)\components\Team.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the problematic lines
content = content.replace(
    '<div className="text-gray-500">> initializing neural_engine...</div>',
    '<div className="text-gray-500">{\'>\'}  initializing neural_engine...</div>'
)
content = content.replace(
    '<div className="text-gray-500">> connecting to swarm_v2...</div>',
    '<div className="text-gray-500">{\'>\'}  connecting to swarm_v2...</div>'
)

# Write back
with open(r'e:\forinit-_-dia---autonomous-ai-data-ops (2)\components\Team.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed!")
