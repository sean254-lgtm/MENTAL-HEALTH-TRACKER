# MENTAL-HEALTH-TRACKER
🌿 Wellbeing — Mental Health Tracker
A beautifully designed, interactive mental health dashboard for tracking mood, sleep, and emotional patterns over time. Built with pure HTML, CSS, and JavaScript — no frameworks required.

✨ Features
📊 Dashboard Overview


Weekly summary of:


Average mood


Sleep duration


Anxiety level


Check-in consistency




Visual indicators (color + arrows) for trends


📈 Mood & Sleep Tracking


Daily mood and sleep visualization using animated bars


Missing entries clearly indicated


Weekly trends at a glance


🔮 Radar Chart Insights


Built with Chart.js


Tracks 5 wellbeing dimensions:


Sleep


Mood


Energy


Social


Calm




Compare current vs previous week


🔍 Trigger Analysis


Identifies:


Stress sources (e.g., work, poor sleep)


Positive influences (exercise, social time)




Color-coded badges:


🟢 Positive


🟡 Warning


🔴 Negative




✍️ Daily Check-In


Interactive sliders:


Mood (1–10)


Sleep (hours)




Select emotional states (tags)


One-click save interaction


📓 Journal Entries


Lightweight journaling system


Mood-linked entries


Timeline-based display


🗓️ Monthly Calendar View


Heatmap-style overview:


Green → Good days


Amber → متوسط days


Red → Low days


Gray → No data




🌗 Dark / Light Mode


Toggle between themes


Theme preference saved in localStorage


🧭 Interactive Guided Tour


Step-by-step onboarding


Highlights each section of the UI


Personalized with user’s name



🛠️ Tech Stack


HTML5


CSS3 (Custom properties, animations, responsive design)


Vanilla JavaScript


Chart.js (v4.4.1)



📂 Project Structure
wellbeing-tracker/│├── index.html     # Main application (HTML + CSS + JS)└── README.md      # Project documentation

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/your-username/wellbeing-tracker.gitcd wellbeing-tracker
2. Open in Browser
Simply open:
index.html
No build tools or dependencies required.

🎨 Customization
Change Theme Defaults
Edit CSS variables:
[data-theme="dark"] {  --bg: #0d1117;  --accent: #5dba82;}
Modify Mood Data
Update arrays in JavaScript:
const moods  = [6, null, 7, 8, 6.5, 5, 7.5];const sleeps = [6.5, null, 7, 8, 6, 5.5, 7];
Add New Tags
<span class="tag">motivated</span>

🧠 How It Works
Data Flow


Static demo data drives charts and UI


User interactions update UI state only (no backend)


Key Components
ComponentDescriptionTheme SystemCSS variables + JS toggleMood BarsDynamic DOM renderingRadar ChartChart.js visualizationCheck-in SystemSliders + tagsTutorial EngineGuided overlay system

📱 Responsiveness


Fully responsive layout


Adapts to:


Desktop


Tablet


Mobile devices





🔐 Data & Privacy


No backend or data storage


All interactions are local


Safe for experimentation and prototyping



⚡ Future Improvements


Persistent storage (localStorage / backend)


User authentication


Real-time analytics


Notifications & reminders


Export data (CSV / PDF)


Mobile app version



🤝 Contributing
Contributions are welcome!


Fork the repo


Create a new branch


Make your changes


Submit a pull request



📄 License
This project is open-source and available under the MIT License.

💡 Inspiration
Designed to promote:


Self-awareness


Emotional tracking


Mental wellbeing habits



🌱 Final Note
This tool is meant to support mental wellness, not replace professional care.
If you're struggling, consider reaching out to a qualified professional.




or convert it into a React / mobile app

