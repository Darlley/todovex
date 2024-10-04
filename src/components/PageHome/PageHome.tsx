'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { useSession } from 'next-auth/react';
import { PageHomeProps } from './PageHome.types';

export default function PageHome(props: PageHomeProps) {
  const tasks = useQuery(api.tasks.get);

  const { data: session } = useSession();

  console.log(session?.user);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-6">Todovex</h1>

      <Card className="">
        <CardHeader>
          <CardTitle>Perfil do usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={session?.user?.image || ''}
                alt={session?.user?.name || 'Usuário'}
              />
              <AvatarFallback>{session?.user?.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">
                {session?.user?.name || 'Não informado'}
              </h2>
              <p>
                <strong>Email:</strong> {session?.user?.email || 'Não informado'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ul className="mt-6 space-y-4">
        {tasks?.map((task) => (
          <li key={task._id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.isCompleted}
              readOnly
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span
              className={`${
                task.isCompleted
                  ? 'line-through text-gray-500'
                  : 'text-gray-900'
              }`}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
