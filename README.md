# SaaS User Analytics Dashboard

This project is a modern, responsive, and insightful dashboard for a Software-as-a-Service (SaaS) platform. It provides customers with a clean interface to view and analyze their account activity through data-driven reports, interactive charts, and detailed activity logs.

The application is built with a mobile-first approach, ensuring a seamless experience across all devices, from large desktop monitors to smartphones.

## ✨ Features

- **Fully Responsive Design**: Adapts beautifully to any screen size.
- **Interactive Sidebar Navigation**: Collapsible on desktop for more screen real estate and a togglable overlay on mobile for easy access.
- **Dynamic Dashboard**: A central hub displaying key performance indicators (KPIs) through visually appealing stat cards.
- **Data Visualization**:
  - **Activity Chart**: A responsive line chart to visualize user logins and signups over time.
  - **Projects Chart**: A bar chart displaying the distribution of tasks across different projects.
- **Powerful Data Filtering**:
  - **Date Range Filter**: Dynamically filter all dashboard data by the last 7, 30, or 90 days.
  - **Live Search**: Instantly filter the "Recent Activity" table by user name or action.
- **Sortable & Paginated Table**: The "Recent Activity" log is easy to navigate with client-side sorting and pagination.
- **Modern UI/UX**: Built with Tailwind CSS for a clean, professional look, complete with smooth transitions and hover effects.
- **Component-Based Architecture**: Developed with reusable React components for maintainability and scalability.

## 🛠️ Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/) (v19)
  - [TypeScript](https://www.typescriptlang.org/)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**:
  - [Recharts](https://recharts.org/)

## 📂 Project Structure

The project is organized into a clean and intuitive directory structure:

```
/
├── public/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── ActivityChart.tsx
│   │   │   └── ProjectsChart.tsx
│   │   ├── icons/
│   │   │   └── Icons.tsx
│   │   ├── ActivityTable.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Header.tsx
│   │   ├── Placeholder.tsx
│   │   ├── Sidebar.tsx
│   │   └── StatCard.tsx
│   ├── App.tsx             # Main application component and routing logic
│   ├── index.tsx           # Application entry point
│   └── types.ts            # Shared TypeScript types and interfaces
├── index.html              # Main HTML file
├── metadata.json           # Project metadata
└── README.md               # This file
```

## 🚀 Getting Started

This application is designed to run in a self-contained web development environment.

1.  **Dependencies**: All dependencies like React, ReactDOM, and Recharts are imported via an `importmap` in `index.html` from a CDN.
2.  **Running the App**: The application is served directly. The entry point is `index.html`, which loads the main React component from `index.tsx`.

No additional installation steps are required.

## 🔮 Future Enhancements

- **Backend Integration**: Connect the dashboard to a real RESTful API to fetch and display live data.
- **Full Page Implementation**: Build out the `Analytics`, `Reports`, `Users`, and `Settings` pages.
- **User Authentication**: Add a secure login flow to protect user data.
- **Advanced Filtering**: Implement more granular filtering options, such as filtering by user role or status.
- **Testing**: Add unit and integration tests to ensure code quality and reliability.
