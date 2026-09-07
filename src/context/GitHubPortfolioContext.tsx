import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GitHubPortfolioItem, INITIAL_GITHUB_PORTFOLIO } from '../data/githubPortfolioData';
import { syncGitHubPortfolio } from '../services/githubPortfolioService';

interface GitHubPortfolioContextType {
  items: GitHubPortfolioItem[];
  websites: GitHubPortfolioItem[];
  apps: GitHubPortfolioItem[];
  isLoading: boolean;
  isRefreshing: boolean;
  lastSynced: Date | null;
  refresh: (force?: boolean) => Promise<void>;
}

const GitHubPortfolioContext = createContext<GitHubPortfolioContextType>({
  items: INITIAL_GITHUB_PORTFOLIO,
  websites: INITIAL_GITHUB_PORTFOLIO.filter((i) => i.kind === 'website'),
  apps: INITIAL_GITHUB_PORTFOLIO.filter((i) => i.kind === 'app'),
  isLoading: false,
  isRefreshing: false,
  lastSynced: null,
  refresh: async () => {},
});

export const GitHubPortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<GitHubPortfolioItem[]>(INITIAL_GITHUB_PORTFOLIO);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const loadData = useCallback(async (force: boolean = false) => {
    if (force) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const res = await syncGitHubPortfolio(force);
      setItems(res.items);
      setLastSynced(res.lastSynced);
    } catch (err) {
      console.error('Failed to load GitHub portfolio:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch from cache or GitHub
    loadData(false);
  }, [loadData]);

  const websites = items.filter((item) => item.kind === 'website');
  const apps = items.filter((item) => item.kind === 'app');

  return (
    <GitHubPortfolioContext.Provider
      value={{
        items,
        websites,
        apps,
        isLoading,
        isRefreshing,
        lastSynced,
        refresh: (force = true) => loadData(force),
      }}
    >
      {children}
    </GitHubPortfolioContext.Provider>
  );
};

export function useGitHubPortfolio() {
  return useContext(GitHubPortfolioContext);
}
