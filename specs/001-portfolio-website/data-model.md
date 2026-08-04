# Data Model: Personal Portfolio Website

## Overview

The portfolio is primarily content-centric rather than transactional. The main entities represent the portfolio owner, their qualifications, projects, contact methods, and inbound contact messages.

## Entity Definitions

### Profile

Represents the portfolio owner’s public identity and summary.

| Field | Type | Description |
|------|------|-------------|
| name | string | Full name displayed in the profile header |
| role | string | Primary professional title, such as Full Stack Web Developer |
| location | string | Physical location or region |
| summary | string | Short professional narrative and value proposition |
| email | string | Primary email contact |
| phone | string | Optional direct phone number |

**Relationships**:
- One profile may have many experience entries, skills, and projects.

### ExperienceEntry

Represents a role, internship, or professional engagement.

| Field | Type | Description |
|------|------|-------------|
| title | string | Job or role title |
| organization | string | Employer, company, or institution |
| startDate | string/date | Start date |
| endDate | string/date | End date or present |
| summary | string | Brief description of responsibilities and impact |

**Relationships**:
- Many experience entries belong to one profile.

### Skill

Represents a capability or area of expertise.

| Field | Type | Description |
|------|------|-------------|
| name | string | Name of the skill or competency |
| category | string | Grouping such as coding, frameworks, tools, or platforms |
| proficiency | string | Optional relative competence indicator |

**Relationships**:
- Many skills belong to one profile.

### Project

Represents a featured project or initiative the portfolio owner wants to highlight.

| Field | Type | Description |
|------|------|-------------|
| title | string | Project name |
| category | string | Personal project or team project |
| summary | string | Short description of purpose and scope |
| impact | string | Value, outcome, or technology used |
| link | string | Optional URL to project or repository |

**Relationships**:
- Many projects belong to one profile.

### ContactChannel

Represents the direct options a visitor can use to reach the portfolio owner.

| Field | Type | Description |
|------|------|-------------|
| type | string | Email, phone, social, or other channel |
| label | string | Human-readable label |
| value | string | Contact value or URL |

**Relationships**:
- One profile may expose multiple contact channels.

### ContactSubmission

Represents an inbound message submitted via the contact form.

| Field | Type | Description |
|------|------|-------------|
| name | string | Sender’s name |
| email | string | Sender’s email |
| phone | string | Optional phone number |
| message | string | Message text |
| submittedAt | datetime | Timestamp of submission |
| status | string | New, sent, failed, or reviewed |

**Validation rules**:
- Required fields: name, email, message
- Email value must be in standard email format
- Message must be non-empty after trimming whitespace
- Status defaults to new and updates after delivery or failure

## Relationships Summary

- Profile 1..* ExperienceEntry
- Profile 1..* Skill
- Profile 1..* Project
- Profile 1..* ContactChannel
- Profile 1..* ContactSubmission

## State Transitions

ContactSubmission states are simple and linear:
- new -> sent
- new -> failed
- sent -> reviewed

This is sufficient for a low-volume contact flow and keeps validation and implementation light.
