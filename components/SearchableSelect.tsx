import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { GroupedOption } from '../types';

interface SearchableSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: GroupedOption[];
  placeholder?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "搜索..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    const lowerQuery = searchQuery.toLowerCase();
    
    return options.map(group => {
      const matchingOptions = group.options.filter(opt => 
        opt.toLowerCase().includes(lowerQuery)
      );
      return { ...group, options: matchingOptions };
    }).filter(group => group.options.length > 0);
  }, [options, searchQuery]);

  return (
    <div className="space-y-2" ref={wrapperRef}>
      <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 pl-1">
        {label}
      </label>
      
      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-left glass-input rounded-xl py-3.5 px-4 flex items-center justify-between transition-all duration-300 group ${
            isOpen ? 'ring-2 ring-teal-500/50 border-teal-500/50 bg-black/60' : 'hover:bg-white/5'
          }`}
        >
          <span className="truncate block mr-2 text-zinc-200 text-sm font-medium">{value}</span>
          <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 group-hover:text-teal-400 ${isOpen ? 'rotate-180 text-teal-400' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[400px] animate-in fade-in zoom-in-95 duration-200 origin-top ring-1 ring-white/5">
            
            {/* Search Input */}
            <div className="p-3 border-b border-white/10 sticky top-0 bg-zinc-950/95 z-10">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
                  autoFocus
                />
              </div>
            </div>

            {/* Options List */}
            <div className="overflow-y-auto custom-scrollbar flex-1 p-2">
              {filteredOptions.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 text-xs">
                  未找到相关选项
                </div>
              ) : (
                filteredOptions.map((group) => (
                  <div key={group.label} className="mb-3 last:mb-0">
                    <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-white/5 rounded-md mb-1 mx-1">
                      {group.label}
                    </div>
                    <div className="space-y-0.5">
                      {group.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            onChange(opt);
                            setIsOpen(false);
                            setSearchQuery('');
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between group/item ${
                            value === opt 
                              ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                              : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                          }`}
                        >
                          <span className="truncate">{opt}</span>
                          {value === opt && <Check className="w-3.5 h-3.5 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};