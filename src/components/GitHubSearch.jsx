import { useState } from 'react';
import useGitHubSearch from '../hooks/useGitHubSearch';

const GitHubSearch = () => {
	const [query, setQuery] = useState('');
	const { repos, fetchRepos, loading, error } = useGitHubSearch();
	const [hoveredRepo, setHoveredRepo] = useState(null); // State to track the hovered repository

	const handleSearch = (e) => {
		const inputText = e.target.value;
		setQuery(inputText);

		if (inputText !== '') {
			fetchRepos(inputText); // Fetch repositories as the user types
		}
	};

	const handleMouseEnter = (repo) => {
		setHoveredRepo(repo); // Set the hovered repo when mouse enters
	};

	console.log(repos);

	return (
		<div className='RepoSearch'>
			{/* Search Input */}
			<div className='RepoSearchResults'>
				<input
					type="text"
					value={query}
					onChange={handleSearch}
					placeholder="Search GitHub repositories"
				/>

				{loading && <p>Loading...</p>}
				{error && <p>{error}</p>}

				{/* Repository List */}
				<ul>
					{repos.map((repo) => (
						<li
							key={repo.id}
							onMouseEnter={() => handleMouseEnter(repo)} // Set hovered repo
						>
							<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
								{repo.name}
							</a>
						</li>
					))}
				</ul>
			</div>

			{/* Repository Details */}
			<div className='RepoSearchDetails'>
				{hoveredRepo ? (
					<div>
						<h2>{hoveredRepo.name}</h2>
						<p><strong>URL:</strong> <a href={hoveredRepo.html_url}>{hoveredRepo.html_url}</a></p>
						<p><strong>Description:</strong> {hoveredRepo.description || 'No description available'}</p>
						<p><strong>Language:</strong> {hoveredRepo.language || 'N/A'}</p>
						<p><strong>Forks:</strong> {hoveredRepo.forks_count || 'N/A'}</p>
						<p><strong>Watchers:</strong> {hoveredRepo.watchers_count || 'N/A'}</p>
						<p><strong>Open issues:</strong> {hoveredRepo.open_issues_count || 'N/A'}</p>
						<p><strong>Owner:</strong> {hoveredRepo.owner.login}</p>
						<p><strong>Owner URL:</strong> <a href={hoveredRepo.owner.html_url} target="_blank" rel="noopener noreferrer">{hoveredRepo.owner.html_url}</a></p>
					</div>
				) : (
					<p>Hover over a repository to see its details.</p>
				)}
			</div>
		</div>
	);
};

export default GitHubSearch;
