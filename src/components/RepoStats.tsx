import { Tooltip } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

interface Contributor {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
}

const RepoStats = () => {
  const [repoData, setRepoData] = useState<{
    stars: number;
    contributors: Contributor[];
  }>({
    stars: 0,
    contributors: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const repoUrl = "https://api.github.com/repos/atiladefreitas/dooing";
      const contributorsUrl = `${repoUrl}/contributors`;

      try {
        const [repoRes, contributorsRes] = await Promise.all([
          fetch(repoUrl),
          fetch(contributorsUrl),
        ]);

        const repoJson = await repoRes.json();
        const contributorsJson = await contributorsRes.json();

        setRepoData({
          stars: repoJson.stargazers_count,
          contributors: contributorsJson,
        });
      } catch (error) {
        console.error("Error fetching repository data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <span className="flex">
        <StarIcon className="h-8 w-8 text-yellow-800" />
        <p className="text-blue-gray-800 font-bold text-2xl">
          {repoData.stars}
        </p>
      </span>

      <h3 className="text-xl font-semibold mb-3">Contributors:</h3>
      <ul className="flex flex-wrap ">
        {repoData.contributors.map((contributor) => (
          <Tooltip key={contributor.id} content={contributor.login}>
            <li className="text-center -mr-3">
              <a
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block transform transition-transform hover:scale-110"
              >
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="w-20 h-20 rounded-full mx-auto mb-2 border-[2px] shadow-xl"
                />
              </a>
            </li>
          </Tooltip>
        ))}
      </ul>
    </div>
  );
};

export default RepoStats;
