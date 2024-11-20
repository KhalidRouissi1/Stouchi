import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <div className="p-4 max-w-3xl m-auto bg-white dark:bg-gray-900 ">
      <Card className="shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            About Stouchi
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
            A powerful and simple way to manage your expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Why Stouchi?
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Stouchi is designed to help you take control of your finances.
            Whether you're a student, freelancer, or managing household
            expenses, Stouchi provides an easy-to-use interface to track,
            categorize, and visualize your spending habits.
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Features:
            </h3>
            <ul className="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>Track daily expenses effortlessly</li>
              <li>Get insights into your spending with visual charts</li>
              <li>
                Organize expenses by category (e.g., Food, Transport, etc.)
              </li>
              <li>Set and manage budgets</li>
              <li>Secure and easy-to-use interface</li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Get Started
            </h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Ready to take charge of your finances? Create an account or log in
              to start tracking your expenses with Stouchi today!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default About;
