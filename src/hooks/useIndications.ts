import { useState, useEffect } from 'react';
import { supabase, IndicationCategory, Indication } from '../lib/supabase';

export type IndicationWithCategory = Indication & {
  category: IndicationCategory;
};

export function useIndications() {
  const [categories, setCategories] = useState<IndicationCategory[]>([]);
  const [indications, setIndications] = useState<Indication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [categoriesResult, indicationsResult] = await Promise.all([
          supabase
            .from('indication_categories')
            .select('*')
            .order('display_order', { ascending: true }),
          supabase
            .from('indications')
            .select('*')
            .order('display_order', { ascending: true })
        ]);

        if (categoriesResult.error) throw categoriesResult.error;
        if (indicationsResult.error) throw indicationsResult.error;

        setCategories(categoriesResult.data || []);
        setIndications(indicationsResult.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { categories, indications, loading, error };
}
