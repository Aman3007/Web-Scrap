import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { storiesApi } from '../api';
import { QUERY_KEYS } from '../constants';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const useStories = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.STORIES, params],
    queryFn: () => storiesApi.getAll(params).then((r) => r.data),
    staleTime: 2 * 60 * 1000,
    keepPreviousData: true,
  });
};

export const useBookmarks = () => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: [QUERY_KEYS.BOOKMARKS],
    queryFn: () => storiesApi.getBookmarks().then((r) => r.data),
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
  });
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();
  const { updateUserBookmarks } = useAuth();

  return useMutation({
    mutationFn: (storyId) => storiesApi.toggleBookmark(storyId).then((r) => r.data),
    onSuccess: (data, storyId) => {
      
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKMARKS] });
      
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STORIES] });
      if (data?.data?.bookmarks) {
        updateUserBookmarks(data.data.bookmarks);
      }
      toast.success(data.message || 'Bookmark updated');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update bookmark');
    },
  });
};

export const useScrape = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => storiesApi.triggerScrape().then((r) => r.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STORIES] });
      toast.success(`Scrape complete! Saved: ${data.data?.saved ?? 0} stories`);
    },
    onError: (err) => toast.error(err.message),
  });
};
