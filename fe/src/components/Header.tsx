import React from 'react'

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header = ({title, subtitle}: HeaderProps) => {
    return (
        <>
            <nav className="sticky top-0 z-20 border-b border-black/5 bg-white/70 backdrop-blur-xl">
                <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5">
                    <span className="text-sm font-semibold tracking-tight">{title}</span>
                   
                </div>
            </nav>

            <header className="px-5 pb-10 pt-16 text-center sm:pt-24">
                <h1 className="text-5xl font-semibold tracking-tighter sm:text-7xl">{title}</h1>
                <p className="mx-auto mt-4 max-w-xl text-xl text-brand-gray sm:text-2xl">{subtitle}</p>
            </header>
        </>
    )
}

export default Header