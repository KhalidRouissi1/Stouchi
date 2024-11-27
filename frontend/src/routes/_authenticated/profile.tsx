import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar'
import { Button } from '../../components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { userQueyOptions } from '../../lib/api'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { isPending, error, data } = useQuery(userQueyOptions)

  if (isPending) {
    return <ProfileSkeleton />
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Error</h2>
        </CardHeader>
        <CardContent>
          <p className="text-center text-destructive">
            Not logged in: {error.message}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Profile</h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Avatar className="w-24 h-24">
          {data.user.picture && (
            <AvatarImage src={data.user.picture} alt={data.user.given_name} />
          )}
          <AvatarFallback>
            {data.user.given_name[0]}
            {data.user.family_name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="text-xl font-semibold">
            {data.user.given_name} {data.user.family_name}
          </h3>
          <p className="text-sm text-muted-foreground">{data.user.email}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="default" asChild>
          <a href="/api/logout">Logout</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProfileSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <Skeleton className="h-8 w-[200px] mx-auto" />
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="text-center">
          <Skeleton className="h-6 w-[150px] mx-auto mb-2" />
          <Skeleton className="h-4 w-[200px] mx-auto" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Skeleton className="h-10 w-[100px]" />
      </CardFooter>
    </Card>
  )
}

export default Profile
