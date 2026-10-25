import React from 'react'
import type { Furniture } from '../types/furniture';
import Card from '../components/Card';

interface ListProps {
    list: Furniture[];
    onDelete: (id: number) => void;
    onOpenedForm: () => void;
}

const List = ({ list, onDelete, onOpenedForm }: ListProps) => {
    return (
        <>
            <section>
                <div className="mb-8 flex justify-between gap-4">
                    <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">
                        New Collection.
                    </h2>
                    <button
                        onClick={onOpenedForm}
                        className="rounded-xl bg-brand-blue px-10 py-4 h-fit text-sm font-medium text-white transition hover:bg-brand-blue-hover "
                    >
                        + Add
                    </button>
                </div>

                {list.length === 0 ? (
                    <p className="rounded-3xl bg-white py-20 text-center text-xl text-brand-gray">
                        Belum ada data furniture
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {list.map((item) => (
                            <Card key={item.id} furniture={item} onDelete={onDelete} />
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}

export default List