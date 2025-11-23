# HCIA-Datacom Quiz WebApp

A comprehensive certification preparation platform for HCIA-Datacom, featuring interactive quizzes, progress tracking, and exam simulations.

## Features

- **22 Chapter-based Quizzes** - Cover all HCIA-Datacom topics
- **Random Quiz Generator** - Mixed questions from all chapters
- **Final Exam Simulation** - Comprehensive assessment
- **Progress Tracking** - Local storage of learning progress
- **Responsive Design** - Works on desktop and mobile
- **Cyber-themed UI** - Matches BB Charming's website aesthetic

## Chapters Covered

1. Data Communication Network Basis
2. Network Reference Model  
3. Huawei VRP
4. Network Layer Protocols and IP Addressing
5. IP Routing Basics
6. OSPF Basics
7. Ethernet Switching Basics
8. VLAN Principles and Configuration
9. STP Principles and Configuration
10. Inter-VLAN Communication
11. Eth-Trunk iStack and CSS
12. ACL Principles and Configuration
13. AAA Principles and Configuration
14. Network Address Translation
15. Network Services and Applications
16. WLAN Overview
17. WAN Technologies
18. Network Management and OM
19. IPv6 Basics
20. Introduction to SDN and NFV
21. Network Programmability and Automation
22. Typical Campus Network Architectures and Practices

## How to Use

1. **From BB Charming Website**: Type `./HCIA-Datacom-Quiz` in the terminal
2. **Direct Access**: Open `hcia-quiz-app/index.html` in your browser
3. **Select Quiz Type**: Choose from Chapter Quiz, Random Quiz, or Final Exam
4. **Track Progress**: Your progress is automatically saved in localStorage

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage API
- **Styling**: Custom CSS with cyber-themed design
- **Icons**: Unicode emojis and custom graphics

## Adding Questions

Edit `data.json` to add more questions following this format:

```json
{
  "id": 9,
  "chapter": 3,
  "chapter_name": "Huawei VRP",
  "topic": "CLI Navigation", 
  "type": "single_choice",
  "question": "Which command shows the current configuration?",
  "options": [
    "A. display current-configuration",
    "B. show running-config", 
    "C. display running-config",
    "D. show configuration"
  ],
  "correct_answer": "A",
  "explanation": "The 'display current-configuration' command shows the current running config in VRP.",
  "difficulty": "easy"
}
