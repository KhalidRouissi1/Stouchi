import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/card'
import Wallet3d from '../Wallet3d'

function About() {
  return (
    <div className="flexp-6 max-w-4xl mx-auto bg-background dark:bg-background">
      <div className="mb-8 w-full h-[400px] relative bg-gradient-to-b from-transparent to-background/10 rounded-lg overflow-hidden">
        <Wallet3d />
      </div>
      <Card className="shadow-xl rounded-xl bg-card dark:bg-card text-card-foreground dark:text-card-foreground">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary dark:text-primary-foreground">
            About Stouchi
          </CardTitle>
          <CardDescription className="text-lg text-foreground dark:text-white">
            A powerful, simple, and secure way to take control of your finances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary dark:text-primary-foreground">
              Why Choose Stouchi?
            </h2>
            <p className="mt-4 text-foreground dark:text-white">
              Stouchi is designed to empower you to take control of your
              financial journey, whether you&apos;re a student, freelancer, or
              managing household expenses. With its intuitive interface, you can
              easily track, categorize, and visualize your spending, all in one
              place.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground">
              Key Features:
            </h3>
            <ul className="mt-4 list-inside list-disc space-y-2 text-foreground dark:text-white">
              <li>Track your daily expenses with ease</li>
              <li>
                Gain insights into your spending habits with interactive charts
              </li>
              <li>
                Organize your finances by categories (e.g., Food, Transport,
                Entertainment)
              </li>
              <li>Set and manage personalized budgets</li>
              <li>Enjoy a secure and user-friendly experience</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground">
              How It Works:
            </h3>

            <p className="mt-4 text-foreground dark:text-white">
              With Stouchi, you can start by adding your expenses and
              categorizing them into predefined or custom categories. The app
              then generates real-time visualizations and insights that help you
              understand where your money is going, making it easier to stay on
              track with your financial goals.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground">
              Get Started Today
            </h3>
            <p className="mt-4 text-foreground dark:text-white">
              Ready to take charge of your financial future?
              <strong>Stouchi</strong> makes it simple. Create an account, log
              in, and start managing your expenses with confidence.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

export default About

export const Route = createFileRoute('/about')({
  component: About,
})
