# IEHP Healthcare Portal

A modern healthcare portal built with Next.js 15, providing patients with easy access to their health information and healthcare services.

## Features

### 🏥 Complete Healthcare Management

- **Patient Dashboard** - Overview of health status, upcoming appointments, and quick actions
- **Appointment Booking** - Multi-step booking flow with doctor search and scheduling
- **Telehealth Integration** - Video call capabilities for remote consultations
- **Lab Results** - View and manage laboratory test results with doctor notes
- **Secure Messaging** - Direct communication with healthcare providers
- **Profile Management** - Complete patient profile and settings management

### 🔐 Authentication & Security

- User registration and login system
- Profile setup with medical history and insurance information
- HIPAA-compliant design principles

### 📱 Responsive Design

- Mobile-first responsive design
- Bottom navigation for mobile devices
- Optimized for all screen sizes

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Heroicons and Lucide React
- **State Management**: React hooks

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/iehp-portal.git
cd iehp-portal
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── appointments/      # Appointment management
│   ├── dashboard/         # Main dashboard
│   ├── messages/          # Patient-provider messaging
│   ├── profile/           # User profile and settings
│   └── lab-results/       # Laboratory results
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## Key Pages & Features

### 1. Welcome/Onboarding (`/`)

- Landing page with app introduction
- Sign up and login navigation
- Healthcare-focused design

### 2. Authentication (`/auth/login`, `/auth/signup`)

- Secure user authentication
- Social login options (Google, Apple)
- Password visibility toggle

### 3. Profile Setup (`/profile/setup`)

- Multi-step profile completion
- Personal information, medical history, insurance
- Progress tracking and validation

### 4. Dashboard (`/dashboard`)

- Personalized health overview
- Quick access to key features
- Upcoming appointments and messages
- Bottom navigation for mobile

### 5. Appointment Booking (`/appointments/book`)

- 5-step booking process
- Doctor search by specialty or symptoms
- Real-time availability checking
- Appointment confirmation with calendar integration

### 6. Telehealth (`/appointments/[id]`)

- Video call interface
- Real-time appointment notes
- File sharing capabilities
- Pre-visit preparation guidance

### 7. Messages (`/messages`)

- Inbox-style messaging interface
- Conversation management
- File attachments support
- Doctor filtering and search

### 8. Lab Results (`/lab-results`)

- Comprehensive results dashboard
- Status tracking (pending, completed, in-progress)
- Doctor notes and follow-up scheduling
- PDF download capabilities

### 9. Profile & Settings (`/profile`)

- Editable personal information
- Notification preferences
- Payment methods management
- Privacy and security settings

## Development Guidelines

### Code Standards

- Use TypeScript for all new files
- Follow Next.js App Router conventions
- Implement responsive design (mobile-first)
- Use Tailwind CSS utility classes
- Create reusable components in `/src/components`

### Healthcare Compliance

- HIPAA compliance considerations in design
- Secure data handling patterns
- Accessibility-first approach
- Clear navigation and user flows

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and React
- UI components inspired by shadcn/ui
- Icons from Heroicons and Lucide React
- Healthcare UX patterns and best practices
