"use client"

import { useState } from "react"
import { ChevronDown, Search, ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { ModeToggle } from "../theme/mode-toggle"

// reusable logo and location components
const Logo = () => (
    <h1 className="text-2xl lg:text-3xl font-bold font-sans tracking-tight text-primary">
        Snap<span className="text-accent-foreground">it</span>
    </h1>
)
const Location = () => (
    <>
        <span className="font-bold">Delivery in 8 minutes</span>
        <span className="text-muted-foreground flex items-center">
            New Road, Kathmandu <ChevronDown className="h-4 w-4 ml-1" />
        </span>
    </>
)

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 lg:gap-10">
                    <Link href="/">
                        <Logo />
                    </Link>
                    <div className="hidden md:flex flex-col items-start justify-center text-sm">
                        <Location />
                    </div>
                </div>

                <div className="flex-1 max-w-xl relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input className="w-full pl-10" placeholder="Search 'chocolate'" />
                </div>

                <div className="flex items-center gap-2 lg:gap-4">
                    <Button variant="ghost" className="hidden md:inline-flex">
                        Login
                    </Button>
                    <Button className="hidden sm:inline-flex">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        My Cart
                    </Button>
                    <ModeToggle />
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen} aria-describedby="menu-description">
                        <SheetTitle className="hidden sr-only">Menu</SheetTitle>
                        <SheetDescription className="hidden sr-only" id="menu-description">
                            This menu contains navigation links and account options.
                        </SheetDescription>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <nav className="flex flex-col gap-4">
                                <Link href="/">
                                    <Logo />
                                </Link>
                                <Link href="/" className="text-lg font-semibold">
                                    Login
                                </Link>

                                <div className="mt-4">
                                    <Location />
                                </div>

                                <Button className="mt-4">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    My Cart
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <div className="md:hidden px-4 py-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input className="w-full pl-10" placeholder="Search 'chocolate'" />
                </div>
            </div>
        </header>
    )
}

