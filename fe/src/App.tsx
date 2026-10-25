import { useState, useCallback } from 'react'
import type { Furniture } from './types/furniture';
import { defaultData } from './data/data';
import Header from './components/Header';
import CatalogSummary from './components/CatalogSummary';
import FormAdd from './components/FormAdd';
import type { DataForm } from './components/FormAdd';
import List from './components/List';
import Footer from './components/Footer';

function App() {
  const [listFurniture, setListFurniture] = useState<Furniture[]>(defaultData);
  const handleAdd = (data: DataForm) => {
    const newItem: Furniture = { id: Date.now(), ...data };
    setListFurniture((prev) => [newItem, ...prev]);
  }

  const handleDelete = (id: number) => {
    setListFurniture((prev) => prev.filter((item) => item.id !== id));
  }

  const totalCategory = new Set(listFurniture.map((f) => f.category)).size
  const cheapest = listFurniture.length > 0 ? Math.min(...listFurniture.map((f) => f.price)) : null

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <Header
        title="Katalog Furniture"
        subtitle="Rancang rumah impianmu. Satu furniture pada satu waktu."
      />

      <main className="mx-auto max-w-6xl px-5">
        <CatalogSummary
          totalItem={listFurniture.length}
          totalCategory={totalCategory}
          cheapest={cheapest}
        />
        <List list={listFurniture} onDelete={handleDelete} onOpenedForm={openModal} />
      </main>

      <Footer />
      {isModalOpen && <FormAdd onAdd={handleAdd} onClose={closeModal} />}
    </>
  )
}

export default App
