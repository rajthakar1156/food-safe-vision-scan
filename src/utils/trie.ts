
class TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;
  word: string;

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.word = '';
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let current = this.root;
    const lowerWord = word.toLowerCase();

    for (let i = 0; i < lowerWord.length; i++) {
      const ch = lowerWord[i];
      if (!current.children[ch]) {
        current.children[ch] = new TrieNode();
      }
      current = current.children[ch];
    }
    current.isEndOfWord = true;
    current.word = word;
  }

  findSuggestions(prefix: string, limit: number = 10): string[] {
    let current = this.root;
    const suggestions: string[] = [];
    const prefixLower = prefix.toLowerCase();

    // Traverse to the last node of the prefix
    for (let i = 0; i < prefixLower.length; i++) {
      const ch = prefixLower[i];
      if (!current.children[ch]) {
        return suggestions;
      }
      current = current.children[ch];
    }

    // Use DFS to find all possible suggestions
    this.dfs(current, suggestions, limit);
    return suggestions;
  }

  private dfs(node: TrieNode, suggestions: string[], limit: number): void {
    if (suggestions.length >= limit) return;

    if (node.isEndOfWord) {
      suggestions.push(node.word);
    }

    for (const ch in node.children) {
      this.dfs(node.children[ch], suggestions, limit);
    }
  }
}
