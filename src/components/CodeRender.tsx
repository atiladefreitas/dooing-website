import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Copy, CheckCheck } from "lucide-react";
import { Button } from "@material-tailwind/react";
import type { ComponentPropsWithoutRef } from "react";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { animate } from "framer-motion";

interface CodeComponentProps extends ComponentPropsWithoutRef<"code"> {
	inline?: boolean;
	className?: string;
}

const CodeRender: React.FC = () => {
	const [markdownContent] = useState(`
\`\`\`lua
{
    "atiladefreitas/dooing",
    config = function()
        require("dooing").setup({
            -- your custom config here (optional)
        })
    end,
}
\`\`\`
`);

	const [copied, setCopied] = useState(false);

	const handleCopy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const scrollToConfig = () => {
		const configSection = document.querySelector("#default-config");
		if (configSection) {
			const top = configSection.getBoundingClientRect().top + window.scrollY;
			animate(window.scrollY, top - 80, {
				duration: 1,
				ease: [0.32, 0.72, 0, 1],
				onUpdate: (value) => window.scrollTo(0, value),
			});
		}
	};

	return (
		<div className="col-span-2 max-w-4xl w-full flex flex-col items-center gap-12">
			<p className="text-4xl font-bold">
				Getting started with{" "}
				<a href="https://lazy.folke.io/" className="text-blue-600">
					Lazy.nvim
				</a>
			</p>
			<ReactMarkdown
				className="w-full"
				components={{
					code: ({
						inline,
						className,
						children,
						...props
					}: CodeComponentProps) => {
						const codeString = String(children).replace(/\n$/, "");

						if (!inline && className?.includes("language-lua")) {
							return (
								<div className="relative group">
									<button
										type="button"
										onClick={() => handleCopy(codeString)}
										className="absolute right-2 top-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
									>
										{copied ? (
											<CheckCheck className="h-4 w-4 text-green-500" />
										) : (
											<Copy className="h-4 w-4 text-gray-300" />
										)}
									</button>
									<SyntaxHighlighter
										// @ts-ignore
										style={dracula}
										language="lua"
										PreTag="div"
										{...props}
									>
										{codeString}
									</SyntaxHighlighter>
								</div>
							);
						}
						return (
							<code className={className} {...props}>
								{children}
							</code>
						);
					},
				}}
			>
				{markdownContent}
			</ReactMarkdown>
			<Button
				placeholder={"button"}
				size="lg"
				color="blue"
				onClick={scrollToConfig}
			>
				See default configuration
			</Button>
		</div>
	);
};

export default CodeRender;
