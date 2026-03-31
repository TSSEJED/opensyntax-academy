# Contributing to OpenSyntax

Thank you for your interest in contributing to OpenSyntax. This platform is 100% community-driven, and every contribution — whether it is a new lesson, a bug fix, or a typo correction — makes a real difference to developers learning around the world.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Add a Lesson](#how-to-add-a-lesson)
- [How to Add a Module](#how-to-add-a-module)
- [Development Setup](#development-setup)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

By participating in this project, you agree to uphold a respectful and inclusive environment. Harassment, discrimination, or abusive behavior will not be tolerated and will result in removal from the community.

---

## How to Add a Lesson

Each learning path has its lesson data defined in its page file:

- **Discord Path:** `app/courses/discord/page.tsx`
- **Web Path:** `app/courses/web/page.tsx`

To add a lesson, add a new entry to the `lessons` array inside the appropriate module:

```ts
{
  id: "my-unique-lesson-id",           // kebab-case, must be unique within the path
  title: "Your Lesson Title",
  description: "A one-line summary of what this lesson covers.",
  duration: "15 min",                  // estimated read/watch time
  content: `
    <h2 ...>Section Heading</h2>
    <p>Lesson body content in HTML...</p>
    <pre><code>// code example</code></pre>
  `,
}
```

**Content guidelines:**
- Use semantic HTML inside the `content` string.
- Code blocks must use `<pre><code>` tags with the class `rounded-lg bg-card border border-border p-4 text-xs font-mono text-foreground overflow-auto`.
- Keep lessons focused — one core concept per lesson.
- Include practical, runnable code examples.

---

## How to Add a Module

To add a new module to a learning path, add a new object to the `modules` array in the relevant page file:

```ts
{
  id: "my-module-id",
  title: "Module N — Short Title",
  lessons: [
    // ... lesson objects
  ],
}
```

---

## Development Setup

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/opensyntax-academy.git
cd opensyntax-academy

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

---

## Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type | When to use |
|------|-------------|
| `feat:` | Adding a new lesson, module, or feature |
| `fix:` | Fixing a bug or incorrect information |
| `docs:` | Changes to documentation only |
| `style:` | Formatting, no logic changes |
| `refactor:` | Code restructuring without changing behavior |

Example: `feat: add Redis pub/sub lesson to discord path`

---

## Pull Request Process

1. Fork the repository and create a new branch: `git checkout -b feat/your-lesson-name`
2. Make your changes following the guidelines above.
3. Ensure the project builds without errors: `pnpm build`
4. Open a pull request against the `main` branch with a clear description.
5. A maintainer will review your PR. Please be patient — this is a community project.

---

Questions? Join us on Discord: [@http.sejed.official](https://www.instagram.com/http.sejed.official/)
