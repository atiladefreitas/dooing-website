import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, CheckCheck } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

interface CodeComponentProps extends ComponentPropsWithoutRef<"code"> {
  inline?: boolean;
  className?: string;
}

const DefaultConfig: React.FC = () => {
  const [markdownContent] = useState(`
\`\`\`lua
{
    -- Core settings
    save_path = vim.fn.stdpath("data") .. "/dooing_todos.json",

    -- Window settings
    window = {
        width = 55,         -- Width of the floating window
        height = 20,        -- Height of the floating window
        border = 'rounded', -- Border style
        padding = {
            top = 1,
            bottom = 1,
            left = 2,
            right = 2,
        },
    },

    -- To-do formatting
    formatting = {
        pending = {
            icon = "○",
            format = { "icon", "text", "due_date", "ect" },
        },
        done = {
            icon = "✓",
            format = { "icon", "text", "due_date", "ect" },
        },
    },
    
    -- Icons
    icons = {
        pending = '○',      -- Pending todo icon
        done = '✓',        -- Completed todo icon
        calendar = '',    -- Calendar icon
    },
    
    -- Keymaps
    keymaps = {
        toggle_window = "<leader>td", -- Toggle the main window
        new_todo = "i",              -- Add a new todo
        toggle_todo = "x",           -- Toggle todo status
        delete_todo = "d",           -- Delete the current todo
        delete_completed = "D",      -- Delete all completed todos
        close_window = "q",          -- Close the window
        add_due_date = "h",          -- Add due date to todo
        remove_due_date = "r",       -- Remove due date from todo
        toggle_help = "?",           -- Toggle help window
        toggle_tags = "t",           -- Toggle tags window
        clear_filter = "c",          -- Clear active tag filter
        edit_todo = "e",             -- Edit todo item
        edit_tag = "e",              -- Edit tag [on tag window]
        delete_tag = "d",            -- Delete tag [on tag window]
        search_todo = "/",           -- Toggle todo searching
        toggle_priority = "<Space>"  -- Toggle todo priority on creation
    },

    -- Priority settings
    priorities = {                   -- Define available priorities
        {
            name = "important",
            weight = 4,              -- Higher weight = higher priority
        },
        {
            name = "urgent",
            weight = 2,
        },
    },
    priority_groups = {              -- Define highlight groups for priority combinations
        high = {
            members = { "important", "urgent" },
            color = nil,             -- Custom color (hex) or nil to use hl_group
            hl_group = "DiagnosticError",
        },
        medium = {
            members = { "important" },
            color = nil,
            hl_group = "DiagnosticWarn",
        },
        low = {
            members = { "urgent" },
            color = nil,
            hl_group = "DiagnosticInfo",
        },
    },
    hour_score_value = 1/8,         -- Priority score adjustment based on estimated hours

    -- Default keymaps
	keymaps = {
		toggle_window = "<leader>td",
		new_todo = "i",
		toggle_todo = "x",
		delete_todo = "d",
		delete_completed = "D",
		close_window = "q",
		add_due_date = "H",
		remove_due_date = "r",
		toggle_help = "?",
		toggle_tags = "t",
		clear_filter = "c",
		edit_todo = "e",
		edit_tag = "e",
		delete_tag = "d",
		search_todos = "/",
		import_todos = "I",
		export_todos = "E",
		remove_duplicates = "<leader>D",
	},

    -- Calendar options
	calendar = {
		language = "en",
		icon = "",
		keymaps = {
			previous_day = "h",
			next_day = "l",
			previous_week = "k",
			next_week = "j",
			previous_month = "H",
			next_month = "L",
			select_day = "<CR>",
			close_calendar = "q",
		},
	},
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

  return (
    <div
      id="default-config"
      className="col-span-2 max-w-4xl w-full flex flex-col items-center gap-12 py-12"
    >
      <p className="text-4xl font-bold">Check the default configs</p>
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
    </div>
  );
};

export default DefaultConfig;
