import ShiftingHeader from '@/app/(authed)/shifting-header'
import { Card } from '@/components/ui/card'
import { ArrowRight, Globe, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <ShiftingHeader />
                <section
                    id="features"
                    className="w-full py-8 md:py-12 lg:py-24 xl:py-32 bg-muted"
                >
                    <div className="container max-w-7xl mx-auto px-6 md:px-8">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
                            Why Choose Cooba?
                        </h2>
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            <Card className="flex flex-col items-center text-center p-6">
                                <Zap className="h-8 w-8 mb-4 text-[hsl(262.1,83.3%,57.8%)]" />
                                <h3 className="text-lg font-bold mb-2">
                                    Lightning Fast
                                </h3>
                                <p className="text-muted-foreground">
                                    Log expenses in seconds with our intuitive
                                    interface and smart categorization.
                                </p>
                            </Card>
                            <Card className="flex flex-col items-center text-center p-6">
                                <Globe className="h-8 w-8 mb-4 text-[hsl(262.1,83.3%,57.8%)]" />
                                <h3 className="text-lg font-bold mb-2">
                                    Multi-currency Support
                                </h3>
                                <p className="text-muted-foreground">
                                    Effortlessly track expenses in EUR, USD,
                                    GBP, and more.
                                </p>
                            </Card>
                            <Card className="flex flex-col items-center text-center p-6">
                                <Users className="h-8 w-8 mb-4 text-[hsl(262.1,83.3%,57.8%)]" />
                                <h3 className="text-lg font-bold mb-2">
                                    Group Expense Tracking
                                </h3>
                                <p className="text-muted-foreground">
                                    Easily split and manage expenses with
                                    friends, family, or colleagues.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>
                <section
                    id="how-it-works"
                    className="w-full py-8 md:py-12 lg:py-24 xl:py-32 bg-background"
                >
                    <div className="container max-w-7xl mx-auto px-6 md:px-8">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
                            How Cooba Works
                        </h2>
                        <div className="grid gap-10 sm:grid-cols-3">
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4 text-white">
                                    1
                                </div>
                                <h3 className="text-lg font-bold mb-2">
                                    Create an Event
                                </h3>
                                <p className="text-muted-foreground">
                                    Set up a new event for tracking expenses in
                                    seconds.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4 text-white">
                                    2
                                </div>
                                <h3 className="text-lg font-bold mb-2">
                                    Add Expenses
                                </h3>
                                <p className="text-muted-foreground">
                                    Input your expenses quickly and easily as
                                    you go.
                                    <br />
                                    Organize your spending with custom
                                    categories and tags for easy tracking.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4 text-white">
                                    3
                                </div>
                                <h3 className="text-lg font-bold mb-2">
                                    View Totals
                                </h3>
                                <p className="text-muted-foreground">
                                    See a beautiful, intuitive breakdown of your
                                    expenses in real-time.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="testimonials"
                    className="w-full py-8 md:py-12 lg:py-24 xl:py-32 bg-muted"
                >
                    <div className="container max-w-7xl mx-auto px-6 md:px-8">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
                            What Our Users Say
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <Card className="p-6">
                                <p className="mb-4 text-muted-foreground">
                                    "Cooba has completely transformed how I
                                    manage my expenses. It's incredibly fast and
                                    easy to use!"
                                </p>
                                <p className="font-semibold">- Sarah J.</p>
                            </Card>
                            <Card className="p-6">
                                <p className="mb-4 text-muted-foreground">
                                    "The multi-currency support is a
                                    game-changer for my international trips. And
                                    it looks great too!"
                                </p>
                                <p className="font-semibold">- Mike T.</p>
                            </Card>
                            <Card className="p-6">
                                <p className="mb-4 text-muted-foreground">
                                    "I love how quickly I can collaborate with
                                    my roommates to track our shared expenses.
                                    Cooba is a lifesaver!"
                                </p>
                                <p className="font-semibold">- Emily R.</p>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="w-full py-8 md:py-12 lg:py-24 xl:py-32 bg-background">
                    <div className="container max-w-7xl mx-auto px-6 md:px-8">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-4 mb-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                    Start Tracking Your Expenses Today
                                </h2>
                                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                                    Sign up for free and take control of your
                                    finances with Cooba - the fastest, easiest,
                                    and most beautiful expense tracking app.
                                </p>
                            </div>
                            <Button size="lg" asChild>
                                <Link href="/events">
                                    Get Started for Free
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-6 md:px-8 border-t border-border bg-background">
                <p className="text-xs text-muted-foreground">
                    © 2024 Cooba. All rights reserved.
                </p>
            </footer>
        </div>
    )
}
