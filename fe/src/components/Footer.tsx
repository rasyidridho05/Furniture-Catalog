import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="mt-24 border-t border-black/10 bg-white/60">
                <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-brand-gray">
                    © {new Date().getFullYear()} Katalog Furniture. Tugas Pemrograman Web.
                </div>
            </footer>
        </>
    )
}

export default Footer