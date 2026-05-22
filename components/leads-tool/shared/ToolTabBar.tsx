"use client";

interface Tab {
  id: string;
  label: string;
}

interface ToolTabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function ToolTabBar({ tabs, activeTab, onTabChange }: ToolTabBarProps) {
  return (
    <div className="flex gap-1 p-1 bg-[#f5f5f4] rounded-xl border border-[#e7e5e4]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === tab.id
              ? "bg-white text-[#1c1917] shadow-sm border border-[#e7e5e4]"
              : "text-[#78716c] hover:text-[#1c1917]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
