
export interface OptimizedResult {
  improvedPrompt: string;
  explanation: string;
  keyChanges: string[];
}

export interface OptimizationState {
  isLoading: boolean;
  error: string | null;
  result: OptimizedResult | null;
}

// Data structures for the dropdowns
export interface GroupedOption {
  label: string;
  options: string[];
}
