# Website Repository Analysis Prompt

You are an expert software architect and web development consultant. I need you to perform a comprehensive analysis of a website codebase and provide detailed recommendations for improvement.

## Your Task

Analyze the entire website repository structure, code quality, architecture, and development practices. Then generate three deliverables:

1. **Comprehensive Analysis Report** (analysis_report.md)
2. **Claude Integration Guide** (claude.md) 
3. **Development Roadmap** (development_plan.md)

## Analysis Framework

### 1. Repository Structure & Organization
- Evaluate folder/file organization and naming conventions
- Assess separation of concerns (frontend/backend/config/assets)
- Review build configuration and dependency management
- Identify any structural anti-patterns or inconsistencies

### 2. Code Quality & Architecture
- **Frontend Analysis:**
  - Component architecture and reusability
  - State management approach
  - CSS/styling methodology and consistency
  - JavaScript/TypeScript code quality
  - Accessibility compliance (WCAG)
  - Performance considerations (bundle size, lazy loading, etc.)
  
- **Backend Analysis (if applicable):**
  - API design and RESTful principles
  - Data models and database schema
  - Authentication/authorization implementation
  - Error handling and logging
  
- **Cross-cutting Concerns:**
  - Security vulnerabilities and best practices
  - Testing coverage and quality
  - Documentation completeness
  - Code duplication and opportunities for DRY
  - TypeScript/type safety usage

### 3. Developer Experience
- Build and development workflow efficiency
- Environment configuration management
- Dependency management and updates
- Git workflow and branching strategy
- CI/CD pipeline (if present)

### 4. Performance & Optimization
- Load time and rendering performance
- Asset optimization (images, fonts, etc.)
- Caching strategies
- SEO optimization
- Mobile responsiveness

### 5. Maintenance & Scalability
- Technical debt assessment
- Scalability bottlenecks
- Upgrade path for dependencies
- Code maintainability score

## Deliverable 1: Analysis Report (analysis_report.md)

Create a comprehensive markdown report with the following structure:

```markdown
# Website Repository Analysis Report
*Generated: [DATE]*

## Executive Summary
[2-3 paragraph overview of findings, critical issues, and key recommendations]

## Repository Overview
- **Technology Stack:** [List all major technologies]
- **Project Type:** [e.g., React SPA, Next.js SSR, Static Site, etc.]
- **Lines of Code:** [Estimate]
- **File Count:** [Count]
- **Last Updated:** [If determinable]

## Detailed Findings

### 1. Architecture & Structure
**Current State:**
[Description of current architecture]

**Strengths:**
- [Bullet points]

**Issues Identified:**
- [Priority: High/Medium/Low] [Description]

**Recommendations:**
- [Specific actionable recommendations]

### 2. Code Quality
[Same structure as above]

### 3. Performance
[Same structure as above]

### 4. Security
[Same structure as above]

### 5. Developer Experience
[Same structure as above]

### 6. Testing & Documentation
[Same structure as above]

## Priority Matrix

| Priority | Issue | Impact | Effort | Recommendation |
|----------|-------|--------|--------|----------------|
| 🔴 High  | [Issue] | [Impact description] | [Effort estimate] | [Action] |
| 🟡 Medium | [Issue] | [Impact description] | [Effort estimate] | [Action] |
| 🟢 Low   | [Issue] | [Impact description] | [Effort estimate] | [Action] |

## Quick Wins
[List 3-5 improvements that provide high value with low effort]

## Technical Debt Score
**Overall Score:** [X/10]
- Code Quality: [X/10]
- Architecture: [X/10]
- Testing: [X/10]
- Documentation: [X/10]
- Performance: [X/10]

## Recommended Reorganization

### Proposed New Structure
```
[Directory tree of recommended structure]
```

### Migration Strategy
[Step-by-step approach to reorganize]
```

## Deliverable 2: Claude Integration Guide (claude.md)

Create a guide for how developers can use Claude to work with this codebase:

```markdown
# Working with Claude on This Project

## Project Context
[Brief description of what this project does and its architecture]

## How to Get the Best Results from Claude

### 1. Providing Context
When asking Claude for help with this codebase, include:
- Specific file paths you're working with
- The feature or component you're modifying
- Any error messages or unexpected behavior
- Your desired outcome

**Example prompt:**
"I'm working on [component/feature] in `src/components/X.jsx`. I need to [specific goal]. Here's the current code: [paste code]. Can you help me [specific request]?"

### 2. Common Tasks & Effective Prompts

#### Adding a New Feature
```
I need to add [feature description] to this website. Based on the current architecture in [relevant folders], what's the best approach? Please provide:
1. File structure for the new feature
2. Code implementation
3. Any necessary updates to existing files
4. Testing recommendations
```

#### Debugging Issues
```
I'm experiencing [issue description] in [component/file]. Here's the relevant code: [paste code]. Here's the error: [paste error]. Can you:
1. Identify the root cause
2. Suggest a fix
3. Explain why this happened
```

#### Refactoring Code
```
I want to refactor [component/module] to [improvement goal]. Here's the current implementation: [paste code]. Please:
1. Suggest a better approach
2. Provide refactored code
3. Explain the benefits
4. Note any breaking changes
```

#### Code Review
```
Please review this [component/feature] implementation: [paste code]. Check for:
- Code quality and best practices
- Potential bugs or edge cases
- Performance considerations
- Accessibility issues
- Security concerns
```

### 3. Project-Specific Conventions

**Naming Conventions:**
- [Document the project's naming patterns]

**State Management:**
- [Explain how state is managed in this project]

**Styling Approach:**
- [CSS modules/Tailwind/Styled-components/etc.]

**Component Patterns:**
- [Functional components, hooks usage, etc.]

**File Organization:**
- [Where different types of files should go]

### 4. Key Files to Reference

When asking Claude about specific functionality, reference these key files:

| File | Purpose | When to Reference |
|------|---------|-------------------|
| [path] | [purpose] | [scenarios] |

### 5. Testing with Claude

```
I need tests for [component/function]. Here's the implementation: [code]. Please create:
1. Unit tests covering [scenarios]
2. Integration tests for [workflows]
3. Edge cases to consider
Use [testing framework] and follow the patterns in `[existing test file]`.
```

### 6. Architecture Decisions

When proposing new features or changes, Claude should consider:
- [List architectural constraints or patterns specific to this project]

### 7. Codebase Learning Path

To understand this codebase quickly, explore files in this order:
1. [Entry point file] - Understand app initialization
2. [Key configuration] - See project setup
3. [Main components] - Learn component structure
4. [State/data layer] - Understand data flow
5. [Utilities] - Common helper functions

### 8. Common Pitfalls & Solutions

| Pitfall | Why It Happens | Solution |
|---------|----------------|----------|
| [Common mistake] | [Reason] | [How to avoid] |

### 9. Performance Optimization Prompts

```
Analyze the performance of [component/page]: [code]. Identify:
1. Unnecessary re-renders
2. Bundle size impacts
3. Load time optimizations
4. Suggested improvements with code examples
```

### 10. Quick Reference Commands

When working with Claude on this project:
- "Show me how to add a new [type] component"
- "What's the pattern for [specific functionality]?"
- "Help me debug [specific issue]"
- "Review this code for [specific concern]"
- "Refactor this to follow the project conventions"

### 11. Custom Claude Instructions (Shortcuts)

To make future analysis easier, save these custom instructions in your Claude conversation:

#### /analyze - Quick Repository Analysis
```
When I type /analyze [component/file/feature], perform a focused analysis:

1. Code Quality Check:
   - Review for bugs, anti-patterns, and best practices
   - Check accessibility and performance
   - Identify security concerns

2. Architecture Review:
   - Assess how it fits with overall project structure
   - Suggest improvements or refactoring opportunities

3. Testing Gaps:
   - Identify missing test coverage
   - Suggest test cases

4. Generate Mini Report:
   Create a brief markdown report with:
   - Summary of findings (2-3 sentences)
   - Priority issues (🔴 High / 🟡 Medium / 🟢 Low)
   - Top 3 recommended actions
   - Code examples where helpful

Use the project conventions documented in claude.md.
```

#### /review - Code Review
```
When I type /review, perform a thorough code review of the provided code:

Check for:
- Code quality and style consistency
- Potential bugs or edge cases
- Performance optimizations
- Security vulnerabilities
- Accessibility compliance
- Best practice recommendations

Format response as:
**Issue** → **Recommendation** → **Example Code**
```

#### /refactor - Refactoring Suggestions
```
When I type /refactor [file/component], suggest refactoring improvements:

1. Analyze current implementation
2. Identify code smells and technical debt
3. Propose refactored version following project patterns
4. Explain benefits and trade-offs
5. Note any breaking changes
6. Provide migration steps if needed

Follow the architectural patterns established in the project.
```

#### /test - Generate Tests
```
When I type /test [component/function], create comprehensive tests:

- Unit tests for core logic
- Integration tests for workflows
- Edge cases and error scenarios
- Mock data/fixtures as needed
- Follow existing test patterns

Match the style and framework used in existing test files.
```

#### /feature - Plan New Feature
```
When I type /feature [description], help implement a new feature:

1. Design approach based on current architecture
2. Propose file structure and organization
3. Provide implementation code
4. Suggest necessary tests
5. Note any configuration changes needed
6. List files that need updates

Follow the conventions documented in claude.md.
```

#### /report - Generate Analysis Report
```
When I type /report [scope], generate a detailed analysis report:

Create a markdown document with:
1. Executive Summary
2. Current State Assessment
3. Issues Identified (prioritized)
4. Recommendations (with code examples)
5. Implementation Plan
6. Success Metrics

Format as professional technical documentation.
```

### How to Set Up Custom Instructions

**In Claude.ai Web/App:**
1. Click your profile → Settings
2. Go to "Personalization" → "Custom instructions"
3. Copy the instruction blocks above
4. Paste into the custom instructions field
5. Now type `/analyze`, `/review`, etc. in conversations

**In Claude CLI:**
Create a project-level instructions file:

```bash
# In your project root
echo 'When I type /analyze...[instructions]' > .claude-instructions
```

Or add to your global Claude config:
```bash
# ~/.config/claude/config.json
{
  "customInstructions": "When I type /analyze [target]..."
}
```

**Example Usage:**
```
/analyze src/components/Header.jsx
/review [paste code]
/refactor src/utils/api.js
/test src/hooks/useAuth.js
/feature user profile page with avatar upload
/report authentication system
```
```

## Deliverable 3: Development Plan (development_plan.md)

Create a phased development roadmap:

```markdown
# Website Development & Improvement Plan

## Overview
This plan outlines a phased approach to improve the codebase based on the analysis findings.

**Timeline:** [Estimated total timeline]
**Team Size Assumption:** [e.g., 1-2 developers]

## Goals
1. [Primary goal]
2. [Secondary goal]
3. [Tertiary goal]

## Phase 1: Critical Fixes & Quick Wins (Week 1-2)
**Goal:** Address critical issues and implement high-value, low-effort improvements

### Tasks
- [ ] **[Task name]**
  - Priority: High
  - Effort: [hours/days]
  - Description: [What and why]
  - Success criteria: [How to measure]
  - Files affected: [List]

### Deliverables
- [List expected outputs]

### Risk Mitigation
- [Potential risks and how to handle them]

## Phase 2: Code Quality & Testing (Week 3-4)
**Goal:** Improve code quality, add missing tests, update documentation

### Tasks
- [ ] **[Task name]**
  - Priority: [Level]
  - Effort: [Estimate]
  - Description: [Details]
  - Dependencies: [What must be done first]
  
### Deliverables
- [List expected outputs]

## Phase 3: Architecture Improvements (Week 5-7)
**Goal:** Refactor problematic areas, improve architecture

### Tasks
- [ ] **Reorganize folder structure**
  - Create migration script
  - Update import paths
  - Update build configuration
  - Test all functionality
  
- [ ] **[Other architectural tasks]**

### Deliverables
- [List expected outputs]

## Phase 4: Performance & Optimization (Week 8-9)
**Goal:** Optimize performance, improve UX

### Tasks
- [ ] **[Performance task]**
  - Baseline metrics: [Current state]
  - Target metrics: [Desired state]
  - Implementation: [Approach]

### Deliverables
- [List expected outputs]

## Phase 5: Polish & Documentation (Week 10)
**Goal:** Final improvements, comprehensive documentation

### Tasks
- [ ] Update README with setup instructions
- [ ] Create contributing guidelines
- [ ] Document all APIs and components
- [ ] Create runbook for common operations

### Deliverables
- [List expected outputs]

## Success Metrics

| Metric | Current | Target | Measurement Method |
|--------|---------|--------|--------------------|
| Test Coverage | [%] | [%] | [Tool] |
| Build Time | [time] | [time] | [How] |
| Page Load Time | [time] | [time] | [Tool] |
| Bundle Size | [size] | [size] | [Tool] |
| Lighthouse Score | [score] | [score] | Lighthouse CI |
| Code Quality Score | [score] | [score] | [Tool] |

## Resource Requirements

### Tools Needed
- [List any tools, libraries, or services]

### Skills Required
- [List expertise needed]

## Risks & Contingencies

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| [Risk description] | [H/M/L] | [H/M/L] | [How to handle] |

## Maintenance Plan (Post-Implementation)

### Weekly
- [Regular maintenance tasks]

### Monthly
- [Monthly review items]

### Quarterly
- [Quarterly improvements]

## Appendix: Detailed Task Breakdown

### [Task Category]
```
Task: [Name]
Estimated time: [Hours]
Prerequisites: [Dependencies]
Steps:
1. [Detailed step]
2. [Detailed step]
Testing: [How to verify]
Rollback plan: [If something goes wrong]
```
```

## Instructions for Execution

1. **Initial Scan:** First, browse the repository structure to understand the project layout
2. **Deep Dive:** Examine key files including:
   - Package.json / dependency files
   - Build configuration
   - Entry points (index.html, main.js, App.jsx, etc.)
   - Representative components
   - Configuration files
   - Any existing documentation

3. **Pattern Recognition:** Identify patterns, conventions, and inconsistencies

4. **Generate Reports:** Create all three markdown files with specific, actionable recommendations

5. **Be Specific:** 
   - Use actual file paths from the repository
   - Reference specific code patterns you observe
   - Provide concrete examples, not generic advice
   - Include code snippets where helpful

6. **Prioritize:** Focus on issues that provide the most value

## Output Format

Please generate three separate markdown files:
1. `analysis_report.md` - Comprehensive technical analysis
2. `claude.md` - Guide for using Claude with this codebase
3. `development_plan.md` - Phased improvement roadmap

Begin your analysis now. Start by examining the repository structure and then proceed to create the deliverables.