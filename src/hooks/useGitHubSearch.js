import { useState } from 'react';

const useGitHubSearch = () => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchRepos = async (query) => {
		setLoading(true);
		setError(null);

		try {
			const client_id = import.meta.env.VITE_GITHUB_CLIENT_ID;
			const client_secret = import.meta.env.VITE_GITHUB_CLIENT_SECRET;
			const repo_count = 30;

			const response = await fetch(
				`https://api.github.com/search/repositories?q=${query}&client_id=${client_id}&client_secret=${client_secret}&per_page=${repo_count}`
			);

			const data = await response.json();
			setRepos(data.items);
		} catch (err) {
			setError('Error fetching repositories: ' + err.message);
		}

		setLoading(false);
	};

	return { repos, fetchRepos, loading, error };
};

export default useGitHubSearch;
