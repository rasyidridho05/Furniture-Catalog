import { useState, useCallback, useEffect } from 'react';
import type { Furniture } from './types/furniture';
import Header from './components/Header';
import CatalogSummary from './components/CatalogSummary';
import FormAdd from './components/FormAdd';
import type { DataForm } from './components/FormAdd';
import List from './components/List';
import Footer from './components/Footer';
import {
  getAllFurniture,
  createFurniture,
  updateFurniture,
  deleteFurniture,
} from './services/furnitureAPI';

function App() {
  const [list, setList] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Furniture | null>(null);

  useEffect(() => {
    getAllFurniture()
      .then(setList)
      .catch(() =>
        setErrorMsg('Gagal memuat data. Pastikan backend berjalan di http://localhost:3000')
      )
      .finally(() => setLoading(false));
  }, []);

  const openAdd = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEdit = (item: Furniture) => {
    setEditing(item);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditing(null);
  }, []);

  const handleSubmit = async (data: DataForm) => {
    if (editing) {
      const updated = await updateFurniture(editing.id, data);
      setList((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    } else {
      const created = await createFurniture(data);
      setList((prev) => [created, ...prev]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFurniture(id);
      setList((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus data');
    }
  };

  const totalCategory = new Set(list.map((f) => f.category)).size;
  const cheapest = list.length > 0 ? Math.min(...list.map((f) => f.price)) : null;

  return (
    <>
      <Header
        title="Katalog Furniture"
        subtitle="Rancang rumah impianmu. Satu furniture pada satu waktu."
      />

      <main className="mx-auto max-w-6xl px-5">
        <CatalogSummary
          totalItem={list.length}
          totalCategory={totalCategory}
          cheapest={cheapest}
        />

        {loading && <p className="py-20 text-center text-brand-gray">Memuat data...</p>}
        {errorMsg && <p className="py-20 text-center text-red-600">{errorMsg}</p>}

        {!loading && !errorMsg && (
          <List
            list={list}
            onDelete={handleDelete}
            onEdit={openEdit}
            onOpenedForm={openAdd}
          />
        )}
      </main>

      <Footer />

      {isModalOpen && (
        <FormAdd
          key={editing?.id ?? 'new'}
          initial={editing ?? undefined}
          onAdd={handleSubmit}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default App;