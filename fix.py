import os

for root, dirs, files in os.walk('app/courses'):
    # We can run it on all, including web, it's idempotent assuming web has no unescaped inner backticks,
    # or if it does, it'll escape them correctly.
    for file in files:
        if file == 'page.tsx':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            in_content = False
            for i, line in enumerate(lines):
                if 'content: `' in line:
                    in_content = True
                    first_tick = line.find('`')
                    
                    if line.rstrip().endswith("`") or line.rstrip().endswith("`,"):
                        last_tick = line.rfind('`')
                        newline = line[:first_tick+1] + line[first_tick+1:last_tick].replace('`', '\\`') + line[last_tick:]
                        lines[i] = newline
                        in_content = False
                        continue
                    
                    newline = line[:first_tick+1] + line[first_tick+1:].replace('`', '\\`')
                    lines[i] = newline
                elif in_content:
                    if line.rstrip().endswith('`') or line.rstrip().endswith("`,"):
                        last_tick = line.rfind('`')
                        newline = line[:last_tick].replace('`', '\\`') + line[last_tick:]
                        lines[i] = newline
                        in_content = False
                    else:
                        lines[i] = line.replace('`', '\\`')
                        
            with open(filepath, 'w', encoding='utf-8') as f:
                f.writelines(lines)
