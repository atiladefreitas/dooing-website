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
            format = { "icon", "notes_icon", "text", "due_date", "ect" },
        },
        in_progress = {
            icon = "◐",
            format = { "icon", "text", "due_date", "ect" },
        },
        done = {
            icon = "✓",
            format = { "icon", "notes_icon", "text", "due_date", "ect" },
        },
    },

    quick_keys = true,      -- Quick keys window
    
    notes = {
        icon = "📓",
    },

    scratchpad = {
        syntax_highlight = "markdown",
    },
    
    -- Keymaps
    keymaps = {
        toggle_window = "<leader>td",
        new_todo = "i",
        toggle_todo = "x",
        delete_todo = "d",
        delete_completed = "D",
        close_window = "q",
        undo_delete = "u",
        add_due_date = "H",
        remove_due_date = "r",
        toggle_help = "?",
        toggle_tags = "t",
        toggle_priority = "<Space>",
        clear_filter = "c",
        edit_todo = "e",
        edit_tag = "e",
        delete_tag = "d",
        search_todos = "/",
        add_time_estimation = "T",
        remove_time_estimation = "R",
        import_todos = "I",
        export_todos = "E",
        remove_duplicates = "<leader>D",
        open_todo_scratchpad = "<leader>p",
    },

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

    -- Priority settings
    priorities = {
        {
            name = "important",
            weight = 4,
        },
        {
            name = "urgent",
            weight = 2,
        },
    },
    priority_groups = {
        high = {
            members = { "important", "urgent" },
            color = nil,
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
    hour_score_value = 1/8,
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
