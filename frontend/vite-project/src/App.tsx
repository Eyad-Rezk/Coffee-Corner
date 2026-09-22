import { useEffect, useState } from 'react';
import type { ICoffee, CoffeeFormData, ViewRoute } from './types/coffee';
import * as api from './services/coffeeService';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { AddCoffeePage } from './pages/AddCoffeePage';
import { EditCoffeePage } from './pages/EditCoffeePage';
import { CoffeeDetailsPage } from './pages/CoffeeDetailsPage';
import { ConfirmModal } from './components/ConfirmModal';
import { Loader2, AlertCircle } from 'lucide-react';

export function App() {
  const [coffees, setCoffees] = useState<ICoffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [route, setRoute] = useState<ViewRoute>('home');
  const [filterMode, setFilterMode] = useState<'all' | 'favorites'>('all');
  const [selectedCoffee, setSelectedCoffee] = useState<ICoffee | null>(null);

  const [confirmDeleteCoffee, setConfirmDeleteCoffee] = useState<ICoffee | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loadCoffees = async () => {
    setLoading(true);
    try {
      const data = await api.getAllCoffees();
      setCoffees(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Unable to load your coffee collection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoffees();
  }, []);

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCoffees((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, isFavorite: !c.isFavorite } : c
      )
    );
    showToast('Updated favorites');
  };

  const handleCreateCoffee = async (data: CoffeeFormData) => {
    setIsSubmitting(true);
    try {
      await api.addCoffee(data);
      await loadCoffees();
      setRoute('collection');
      showToast('New coffee added to your journal.');
    } catch (err: any) {
      showToast(err.message || 'Duplicate coffee detected.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCoffee = async (id: string, data: Partial<CoffeeFormData>) => {
    setIsUpdating(true);
    try {
      const updated = await api.updateCoffee(id, data);
      setCoffees((prev) => prev.map((c) => (c._id === id ? updated : c)));
      setSelectedCoffee(updated);
      setRoute('details');
      showToast('Journal entry updated.');
    } catch (err: any) {
      showToast(err.message || 'Failed to update entry.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDeleteCoffee?._id) return;
    setIsDeleting(true);
    try {
      await api.deleteCoffee(confirmDeleteCoffee._id);
      setCoffees((prev) => prev.filter((c) => c._id !== confirmDeleteCoffee._id));
      setConfirmDeleteCoffee(null);
      setSelectedCoffee(null);
      setRoute('collection');
      showToast('Removed from your collection.');
    } catch (err: any) {
      showToast(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const favoritesCount = coffees.filter((c) => c.isFavorite).length;

  return (
    <div className="min-h-screen bg-[#fcf9f5] text-[#1f140e] antialiased selection:bg-[#8c533e]/20">
      <Navbar
        currentRoute={route}
        onRouteChange={(r) => {
          setFilterMode(r === 'favorites' ? 'favorites' : 'all');
          setRoute(r === 'favorites' ? 'collection' : r);
        }}
        favoritesCount={favoritesCount}
      />

      <main>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-[#6e5d50]">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#8c533e]" />
            <p className="text-sm">Opening coffee journal...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto my-24 bg-red-50/80 border border-red-200 text-red-900 rounded-3xl p-8 text-center">
            <AlertCircle className="w-8 h-8 text-red-700 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg mb-2">Something went wrong</h3>
            <p className="text-sm text-red-700/80 mb-6">{error}</p>
            <button
              onClick={loadCoffees}
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-red-900 text-white cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {route === 'home' && (
              <HomePage
                onNavigateAdd={() => setRoute('add')}
                onNavigateCollection={() => setRoute('collection')}
              />
            )}

            {route === 'collection' && (
              <CollectionPage
                coffees={coffees}
                filterMode={filterMode}
                onFilterChange={setFilterMode}
                onSelectCoffee={(coffee) => {
                  setSelectedCoffee(coffee);
                  setRoute('details');
                }}
                onToggleFavorite={handleToggleFavorite}
                onNavigateAdd={() => setRoute('add')}
              />
            )}

            {route === 'add' && (
              <AddCoffeePage
                onSubmit={handleCreateCoffee}
                loading={isSubmitting}
              />
            )}

            {route === 'edit' && selectedCoffee && (
              <EditCoffeePage
                coffee={selectedCoffee}
                onSubmit={handleUpdateCoffee}
                onCancel={() => setRoute('details')}
                loading={isUpdating}
              />
            )}

            {route === 'details' && selectedCoffee && (
              <CoffeeDetailsPage
                coffee={selectedCoffee}
                onBack={() => setRoute('collection')}
                onToggleFavorite={(id) => handleToggleFavorite(id)}
                onDeleteRequest={(coffee) => setConfirmDeleteCoffee(coffee)}
                onEditRequest={(coffee) => {
                  setSelectedCoffee(coffee);
                  setRoute('edit');
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(confirmDeleteCoffee)}
        title={`Delete ${confirmDeleteCoffee?.name}?`}
        message="This coffee will be removed from your collection."
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDeleteCoffee(null)}
        loading={isDeleting}
      />

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1f140e] text-[#fdfbf7] text-xs font-medium px-5 py-3 rounded-full shadow-xl animate-fadeIn">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;