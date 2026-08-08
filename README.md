ABTalks — 60 Day Coding Challenge

A mobile-first redesign of the ABTalks 60-Day Coding Challenge, built for college students who want to build consistently, share their progress publicly, and become more visible to recruiters.

Live Demo

Live Deployment:** YOUR_DEPLOYMENT_URL

Route Map

/

/dashboard

/day/12

Problem

ABTalks helps Indian college students maintain a 60-day coding streak by building something every day and submitting public proof of work through GitHub and LinkedIn.

The existing product works, but the experience has not been designed around the way students actually use it — primarily on mobile, often late at night after college.

This redesign focuses on making the daily building and submission experience simple, motivating, and easy to understand.

Key Features

* Mobile-first experience optimized for a 390px viewport
* 60-day challenge progress tracking
* Current streak tracking
* Daily challenge/task view
* GitHub repository and commit proof submission
* LinkedIn post proof submission
* Achievement and student standing
* Missed-day experience
* First-day/no-streak experience
* Empty profile state
* **Proof Strength** indicator showing completion of GitHub and LinkedIn proof

Main Screens

Landing Page `/`

Introduces ABTalks to a new student and explains:

* What the 60-day challenge is
* How the challenge works
* Why public proof matters
* How students can get started

Student Dashboard `/dashboard`

Provides the student's daily overview:

* Current streak
* Challenge progress
* Today's task
* Overall completion
* Achievements
* Student standing

Challenge Day `/day/12`

Provides the complete daily challenge experience:

* Today's task
* What needs to be built
* Success criteria
* GitHub repository/commit submission
* LinkedIn post submission
* Submission confirmation

Thoughtful UX Feature — Proof Strength

The challenge is not only about completing a task; students need to publicly prove their work.

The **Proof Strength** indicator makes this visible:

* GitHub proof ✓
* LinkedIn proof ✓

When both are submitted, the student gets a complete proof state.

Edge Cases

The prototype also considers real-world situations:

* **First day:** The student starts their first streak instead of seeing an empty progress state.
* **Missed day:** The student's previous progress is preserved and they are encouraged to continue.
* **Empty profile:** The interface provides a clear prompt to complete missing profile information.

Tech Stack

* React
* Vite
* JavaScript
* CSS
* Mock data

No authentication, production database, GitHub API, or LinkedIn API is required for this prototype.

Project Structure

```text
abtalks/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

Mock Data

The prototype uses locally defined mock data to simulate:

* Student information
* Challenge progress
* Streak
* Daily tasks
* Achievements
* Proof submissions

Hackathon Scope

This project focuses on the three required student experiences:

1. Landing Page
2. Student Dashboard
3. Challenge Day

Authentication, production database infrastructure, recruiter dashboards, and admin functionality are intentionally out of scope.

Built For

ABTalks 48-Hour Hackathon

---
 Route Map

/

/dashboard

/day/12
