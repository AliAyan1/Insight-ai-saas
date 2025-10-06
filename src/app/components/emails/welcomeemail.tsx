// File: components/emails/WelcomeEmail.tsx (FINAL AND CORRECTED)

"use client"; // YEH LINE SAB SE ZAROORI HAI

import * as React from 'react';

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({ name }) => (
  <div>
    <h1>Welcome to InsightAI Pro, {name}!</h1>
    <p>
      Thank you for joining our platform. We're excited to help you turn your data into actionable insights.
    </p>
    <p>
      You can now log in to your dashboard and start analyzing your first CSV file.
    </p>
    <a 
      href={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/login`}
      style={{
        backgroundColor: '#6d28d9',
        color: 'white',
        padding: '12px 24px',
        textDecoration: 'none',
        borderRadius: '8px',
        display: 'inline-block',
        marginTop: '16px'
      }}
    >
      Go to your Dashboard
    </a>
    <br />
    <p style={{ marginTop: '24px', color: '#555' }}>
      Best regards,
      <br />
      The DataAI Pro Team
    </p>
  </div>
);