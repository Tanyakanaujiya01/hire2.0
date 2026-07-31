export const DSA_SHEETS_LIST = [
  { id: "all", name: "All Sheets" },
  { id: "striver-a2z", name: "Striver's A2Z DSA Sheet" },
  { id: "blind-75", name: "Blind 75" },
  { id: "neetcode-150", name: "NeetCode 150" },
  { id: "love-babbar-450", name: "Love Babbar 450 Sheet" },
  { id: "top-interview-150", name: "Top Interview 150" },
  { id: "system-design-sheet", name: "System Design & LLD Sheet" }
];

export const DSA_SHEET_CATEGORIES = [
  { id: "all", name: "All Topics" },
  { id: "arrays", name: "Arrays & Hashing" },
  { id: "strings", name: "Strings & Pattern Matching" },
  { id: "two-pointers", name: "Two Pointers & Sliding Window" },
  { id: "linked-list", name: "Linked Lists" },
  { id: "trees", name: "Trees & Binary Search Trees" },
  { id: "graphs", name: "Graphs & Traversals" },
  { id: "dp", name: "Dynamic Programming" },
  { id: "greedy", name: "Greedy & Backtracking" },
  { id: "system-design", name: "System Design & LLD/HLD" }
];

export const DSA_PROBLEMS_DATA = [
  // ARRAYS & HASHING
  {
    id: "dsa-1",
    title: "Two Sum",
    category: "arrays",
    difficulty: "Easy",
    sheets: ["striver-a2z", "blind-75", "neetcode-150", "top-interview-150"],
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    gfgUrl: "https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    summary: "Find indices of two numbers in an array such that they add up to a target sum.",
    approach: "Use a Hash Map to store each element and its index while iterating through the array. For the current element `x`, check if `target - x` exists in the map.",
    hints: [
      "Can we do better than the brute force O(N^2) double loop?",
      "What data structure gives O(1) average lookup time?",
      "Store complement `target - nums[i]` in a Hash Table."
    ],
    codeSnippets: {
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (mp.find(complement) != mp.end()) {\n                return {mp[complement], i};\n            }\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) {\n                return new int[] { map.get(comp), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in seen:\n                return [seen[diff], i]\n            seen[n] = i\n        return []`,
      javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) {\n      return [map.get(diff), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`
    }
  },
  {
    id: "dsa-2",
    title: "Best Time to Buy and Sell Stock",
    category: "arrays",
    difficulty: "Easy",
    sheets: ["striver-a2z", "blind-75", "neetcode-150", "love-babbar-450"],
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    gfgUrl: "https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-twice/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    summary: "Find maximum profit achievable from buying on one day and selling on a future day.",
    approach: "Track the minimum purchase price seen so far (`minPrice`). At each day `i`, calculate potential profit `prices[i] - minPrice` and update `maxProfit`.",
    hints: [
      "Keep track of the lowest price encountered as you iterate.",
      "Calculate profit at each step and keep the maximum."
    ],
    codeSnippets: {
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int minPrice = INT_MAX, maxProfit = 0;\n        for (int price : prices) {\n            minPrice = min(minPrice, price);\n            maxProfit = max(maxProfit, price - minPrice);\n        }\n        return maxProfit;\n    }\n};`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit = 0;\n        for (int price : prices) {\n            if (price < minPrice) minPrice = price;\n            else if (price - minPrice > maxProfit) maxProfit = price - minPrice;\n        }\n        return maxProfit;\n    }\n}`,
      python: `class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        min_p, max_p = float('inf'), 0\n        for p in prices:\n            min_p = min(min_p, p)\n            max_p = max(max_p, p - min_p)\n        return max_p`,
      javascript: `function maxProfit(prices) {\n  let minPrice = Infinity, maxProfit = 0;\n  for (let price of prices) {\n    minPrice = Math.min(minPrice, price);\n    maxProfit = Math.max(maxProfit, price - minPrice);\n  }\n  return maxProfit;\n}`
    }
  },
  {
    id: "dsa-3",
    title: "Product of Array Except Self",
    category: "arrays",
    difficulty: "Medium",
    sheets: ["blind-75", "neetcode-150", "top-interview-150"],
    leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
    gfgUrl: "https://www.geeksforgeeks.org/a-product-array-puzzle/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    summary: "Return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i] without using division.",
    approach: "Compute prefix products in output array, then traverse backwards to accumulate suffix products in a single scalar variable.",
    hints: [
      "Try calculating prefix products from left to right.",
      "Calculate suffix products from right to left.",
      "Combine both without allocating O(N) extra memory."
    ],
    codeSnippets: {
      cpp: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> res(n, 1);\n        int prefix = 1;\n        for (int i = 0; i < n; i++) {\n            res[i] = prefix;\n            prefix *= nums[i];\n        }\n        int suffix = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= suffix;\n            suffix *= nums[i];\n        }\n        return res;\n    }\n};`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        res[0] = 1;\n        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];\n        int right = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= right;\n            right *= nums[i];\n        }\n        return res;\n    }\n}`,
      python: `class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        res = [1] * len(nums)\n        prefix = 1\n        for i in range(len(nums)):\n            res[i] = prefix\n            prefix *= nums[i]\n        suffix = 1\n        for i in range(len(nums) - 1, -1, -1):\n            res[i] *= suffix\n            suffix *= nums[i]\n        return res`,
      javascript: `function productExceptSelf(nums) {\n  const n = nums.length;\n  const res = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    res[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    res[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return res;\n}`
    }
  },

  // STRINGS & PATTERN MATCHING
  {
    id: "dsa-4",
    title: "Valid Anagram",
    category: "strings",
    difficulty: "Easy",
    sheets: ["blind-75", "neetcode-150", "striver-a2z"],
    leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
    gfgUrl: "https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    summary: "Check if string t is an anagram of string s.",
    approach: "Count frequencies of each character using a frequency table of size 26. Increment for s, decrement for t, and verify all counts are 0.",
    hints: [
      "Can two strings be anagrams if their lengths differ?",
      "Use a fixed-size frequency array of 26 letters."
    ],
    codeSnippets: {
      cpp: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.length() != t.length()) return false;\n        vector<int> count(26, 0);\n        for (int i = 0; i < s.length(); i++) {\n            count[s[i] - 'a']++;\n            count[t[i] - 'a']--;\n        }\n        for (int c : count) if (c != 0) return false;\n        return true;\n    }\n};`,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            count[s.charAt(i) - 'a']++;\n            count[t.charAt(i) - 'a']--;\n        }\n        for (int c : count) if (c != 0) return false;\n        return true;\n    }\n}`,
      python: `class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t): return False\n        count = {}\n        for char in s:\n            count[char] = count.get(char, 0) + 1\n        for char in t:\n            if char not in count or count[char] == 0: return False\n            count[char] -= 1\n        return True`,
      javascript: `function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let char of s) count[char] = (count[char] || 0) + 1;\n  for (let char of t) {\n    if (!count[char]) return false;\n    count[char]--;\n  }\n  return true;\n}`
    }
  },

  // TWO POINTERS & SLIDING WINDOW
  {
    id: "dsa-5",
    title: "Container With Most Water",
    category: "two-pointers",
    difficulty: "Medium",
    sheets: ["blind-75", "neetcode-150", "top-interview-150", "love-babbar-450"],
    leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
    gfgUrl: "https://www.geeksforgeeks.org/container-with-most-water/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    summary: "Find two lines that together with the x-axis form a container containing the most water.",
    approach: "Use Two Pointers placed at left = 0 and right = n - 1. Calculate area = min(height[left], height[right]) * (right - left). Move the pointer pointing to the shorter line inward.",
    hints: [
      "Start with maximum width (pointers at both ends).",
      "Area is constrained by the shorter line.",
      "Move whichever pointer points to the shorter height."
    ],
    codeSnippets: {
      cpp: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int l = 0, r = height.size() - 1;\n        int maxWater = 0;\n        while (l < r) {\n            int h = min(height[l], height[r]);\n            maxWater = max(maxWater, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxWater;\n    }\n};`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        int l = 0, r = height.length - 1;\n        int maxArea = 0;\n        while (l < r) {\n            int current = Math.min(height[l], height[r]) * (r - l);\n            maxArea = Math.max(maxArea, current);\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxArea;\n    }\n}`,
      python: `class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        l, r = 0, len(height) - 1\n        max_a = 0\n        while l < r:\n            area = min(height[l], height[r]) * (r - l)\n            max_a = max(max_a, area)\n            if height[l] < height[r]: l += 1\n            else: r -= 1\n        return max_a`,
      javascript: `function maxArea(height) {\n  let l = 0, r = height.length - 1;\n  let maxWater = 0;\n  while (l < r) {\n    const area = Math.min(height[l], height[r]) * (r - l);\n    maxWater = Math.max(maxWater, area);\n    if (height[l] < height[r]) l++;\n    else r--;\n  }\n  return maxWater;\n}`
    }
  },

  // LINKED LIST
  {
    id: "dsa-6",
    title: "Reverse Linked List",
    category: "linked-list",
    difficulty: "Easy",
    sheets: ["striver-a2z", "blind-75", "neetcode-150", "love-babbar-450"],
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
    gfgUrl: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    summary: "Reverse a singly linked list iteratively or recursively.",
    approach: "Maintain `prev = nullptr`, `curr = head`. In each step, store `nextTemp = curr->next`, point `curr->next = prev`, advance `prev = curr` and `curr = nextTemp`.",
    hints: [
      "You need 3 pointers: prev, curr, and next.",
      "Be careful not to lose reference to next node when mutating pointers."
    ],
    codeSnippets: {
      cpp: `ListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while (curr) {\n        ListNode* nextNode = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nextNode;\n    }\n    return prev;\n}`,
      java: `public ListNode reverseList(ListNode head) {\n    ListNode prev = null, curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}`,
      python: `def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev`,
      javascript: `function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`
    }
  },

  // TREES
  {
    id: "dsa-7",
    title: "Lowest Common Ancestor of a Binary Tree",
    category: "trees",
    difficulty: "Medium",
    sheets: ["striver-a2z", "blind-75", "neetcode-150", "top-interview-150"],
    leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    gfgUrl: "https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-tree/",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    summary: "Find the lowest node in a Binary Tree that has both node p and node q as descendants.",
    approach: "Recursively search left and right subtrees. If current node equals `p` or `q`, return current node. If both left and right calls return non-null, current node is the LCA.",
    hints: [
      "If p and q are in left and right subtrees respectively, root is the LCA.",
      "If left search returns null, LCA must be in the right subtree."
    ],
    codeSnippets: {
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if (!root || root == p || root == q) return root;\n    TreeNode* left = lowestCommonAncestor(root->left, p, q);\n    TreeNode* right = lowestCommonAncestor(root->right, p, q);\n    if (left && right) return root;\n    return left ? left : right;\n}`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q) return root;\n    TreeNode left = lowestCommonAncestor(root.left, p, q);\n    TreeNode right = lowestCommonAncestor(root.right, p, q);\n    if (left != null && right != null) return root;\n    return left != null ? left : right;\n}`,
      python: `def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n    if not root or root == p or root == q: return root\n    left = self.lowestCommonAncestor(root.left, p, q)\n    right = self.lowestCommonAncestor(root.right, p, q)\n    if left and right: return root\n    return left or right`,
      javascript: `function lowestCommonAncestor(root, p, q) {\n  if (!root || root === p || root === q) return root;\n  const left = lowestCommonAncestor(root.left, p, q);\n  const right = lowestCommonAncestor(root.right, p, q);\n  if (left && right) return root;\n  return left ? left : right;\n}`
    }
  },

  // GRAPHS
  {
    id: "dsa-8",
    title: "Number of Islands",
    category: "graphs",
    difficulty: "Medium",
    sheets: ["striver-a2z", "blind-75", "neetcode-150", "top-interview-150", "love-babbar-450"],
    leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
    gfgUrl: "https://www.geeksforgeeks.org/find-number-of-islands/",
    timeComplexity: "O(M * N)",
    spaceComplexity: "O(M * N)",
    summary: "Count connected components of '1's (land) surrounded by '0's (water).",
    approach: "Iterate over every cell. When a '1' is encountered, increment island count and initiate BFS or DFS to sink all connected '1's by setting them to '0'.",
    hints: [
      "Traverse 2D grid cell by cell.",
      "Use DFS or BFS to mark visited land cells so they aren't recounted."
    ],
    codeSnippets: {
      cpp: `void dfs(vector<vector<char>>& grid, int r, int c) {\n    if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] == '0') return;\n    grid[r][c] = '0';\n    dfs(grid, r+1, c); dfs(grid, r-1, c);\n    dfs(grid, r, c+1); dfs(grid, r, c-1);\n}\nint numIslands(vector<vector<char>>& grid) {\n    int count = 0;\n    for (int i = 0; i < grid.size(); i++) {\n        for (int j = 0; j < grid[0].size(); j++) {\n            if (grid[i][j] == '1') {\n                count++;\n                dfs(grid, i, j);\n            }\n        }\n    }\n    return count;\n}`,
      java: `public int numIslands(char[][] grid) {\n    int count = 0;\n    for (int r = 0; r < grid.length; r++) {\n        for (int c = 0; c < grid[0].length; c++) {\n            if (grid[r][c] == '1') {\n                count++;\n                dfs(grid, r, c);\n            }\n        }\n    }\n    return count;\n}\nprivate void dfs(char[][] grid, int r, int c) {\n    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == '0') return;\n    grid[r][c] = '0';\n    dfs(grid, r + 1, c); dfs(grid, r - 1, c);\n    dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n}`,
      python: `def numIslands(self, grid: List[List[str]]) -> int:\n    if not grid: return 0\n    rows, cols = len(grid), len(grid[0])\n    count = 0\n    def dfs(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0': return\n        grid[r][c] = '0'\n        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count += 1\n                dfs(r, c)\n    return count`,
      javascript: `function numIslands(grid) {\n  let count = 0;\n  const dfs = (r, c) => {\n    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] === '0') return;\n    grid[r][c] = '0';\n    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);\n  };\n  for (let r = 0; r < grid.length; r++) {\n    for (let c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] === '1') {\n        count++;\n        dfs(r, c);\n      }\n    }\n  }\n  return count;\n}`
    }
  },

  // DYNAMIC PROGRAMMING
  {
    id: "dsa-9",
    title: "Longest Common Subsequence (LCS)",
    category: "dp",
    difficulty: "Hard",
    sheets: ["striver-a2z", "blind-75", "neetcode-150", "love-babbar-450"],
    leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
    gfgUrl: "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/",
    timeComplexity: "O(M * N)",
    spaceComplexity: "O(M * N)",
    summary: "Find the length of the longest subsequence present in both strings `text1` and `text2`.",
    approach: "Create 2D DP array `dp[i][j]`. If `text1[i-1] == text2[j-1]`, then `dp[i][j] = 1 + dp[i-1][j-1]`. Else `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.",
    hints: [
      "Subsequence does not need to be contiguous.",
      "Define state DP(i, j) = LCS of text1[0..i] and text2[0..j].",
      "Base case: empty string has LCS length 0."
    ],
    codeSnippets: {
      cpp: `int longestCommonSubsequence(string text1, string text2) {\n    int m = text1.size(), n = text2.size();\n    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (text1[i-1] == text2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return dp[m][n];\n}`,
      java: `public int longestCommonSubsequence(String text1, String text2) {\n    int m = text1.length(), n = text2.length();\n    int[][] dp = new int[m + 1][n + 1];\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n                dp[i][j] = 1 + dp[i - 1][j - 1];\n            } else {\n                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n            }\n        }\n    }\n    return dp[m][n];\n}`,
      python: `def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n    m, n = len(text1), len(text2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i-1] == text2[j-1]:\n                dp[i][j] = 1 + dp[i-1][j-1]\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]`,
      javascript: `function longestCommonSubsequence(text1, text2) {\n  const m = text1.length, n = text2.length;\n  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i - 1] === text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];\n      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n    }\n  }\n  return dp[m][n];\n}`
    }
  },

  // GREEDY & BACKTRACKING
  {
    id: "dsa-10",
    title: "N-Queens Problem",
    category: "greedy",
    difficulty: "Hard",
    sheets: ["striver-a2z", "love-babbar-450"],
    leetcodeUrl: "https://leetcode.com/problems/n-queens/",
    gfgUrl: "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/",
    timeComplexity: "O(N!)",
    spaceComplexity: "O(N^2)",
    summary: "Place N chess queens on an N×N chessboard such that no two queens attack each other.",
    approach: "Use Backtracking row by row. Track occupied columns, main diagonals (r - c), and anti-diagonals (r + c) using hash sets or boolean arrays.",
    hints: [
      "Place queens one row at a time.",
      "Diagonal 1 index is (r - c), Diagonal 2 index is (r + c).",
      "Backtrack when a queen placement leads to invalid state."
    ],
    codeSnippets: {
      cpp: `class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        vector<vector<string>> ans;\n        vector<string> board(n, string(n, '.'));\n        vector<bool> cols(n, false), diag1(2*n, false), diag2(2*n, false);\n        auto backtrack = [&](auto& self, int r) -> void {\n            if (r == n) { ans.push_back(board); return; }\n            for (int c = 0; c < n; c++) {\n                if (cols[c] || diag1[r-c+n] || diag2[r+c]) continue;\n                board[r][c] = 'Q';\n                cols[c] = diag1[r-c+n] = diag2[r+c] = true;\n                self(self, r + 1);\n                board[r][c] = '.';\n                cols[c] = diag1[r-c+n] = diag2[r+c] = false;\n            }\n        };\n        backtrack(backtrack, 0);\n        return ans;\n    }\n};`,
      java: `class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        List<List<String>> res = new ArrayList<>();\n        char[][] board = new char[n][n];\n        for (char[] row : board) Arrays.fill(row, '.');\n        backtrack(0, board, res, n);\n        return res;\n    }\n    private void backtrack(int r, char[][] board, List<List<String>> res, int n) {\n        if (r == n) {\n            List<String> list = new ArrayList<>();\n            for (char[] row : board) list.add(new String(row));\n            res.add(list);\n            return;\n        }\n        for (int c = 0; c < n; c++) {\n            if (isValid(board, r, c, n)) {\n                board[r][c] = 'Q';\n                backtrack(r + 1, board, res, n);\n                board[r][c] = '.';\n            }\n        }\n    }\n    private boolean isValid(char[][] board, int r, int c, int n) {\n        for (int i = 0; i < r; i++) if (board[i][c] == 'Q') return false;\n        for (int i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] == 'Q') return false;\n        for (int i = r - 1, j = c + 1; i >= 0 && j < n; i--, j++) if (board[i][j] == 'Q') return false;\n        return true;\n    }\n}`,
      python: `class Solution:\n    def solveNQueens(self, n: int) -> List[List[str]]:\n        res = []\n        board = [["."] * n for _ in range(n)]\n        cols, diag1, diag2 = set(), set(), set()\n        def backtrack(r):\n            if r == n:\n                res.append(["".join(row) for row in board])\n                return\n            for c in range(n):\n                if c in cols or (r-c) in diag1 or (r+c) in diag2: continue\n                cols.add(c); diag1.add(r-c); diag2.add(r+c)\n                board[r][c] = "Q"\n                backtrack(r + 1)\n                cols.remove(c); diag1.remove(r-c); diag2.remove(r+c)\n                board[r][c] = "."\n        backtrack(0)\n        return res`,
      javascript: `function solveNQueens(n) {\n  const res = [];\n  const board = Array.from({ length: n }, () => Array(n).fill('.'));\n  const cols = new Set(), diag1 = new Set(), diag2 = new Set();\n  function backtrack(r) {\n    if (r === n) {\n      res.push(board.map(row => row.join('')));\n      return;\n    }\n    for (let c = 0; c < n; c++) {\n      if (cols.has(c) || diag1.has(r - c) || diag2.has(r + c)) continue;\n      cols.add(c); diag1.add(r - c); diag2.add(r + c);\n      board[r][c] = 'Q';\n      backtrack(r + 1);\n      cols.delete(c); diag1.delete(r - c); diag2.delete(r + c);\n      board[r][c] = '.';\n    }\n  }\n  backtrack(0);\n  return res;\n}`
    }
  },

  // SYSTEM DESIGN
  {
    id: "dsa-11",
    title: "Design a Rate Limiter (Token Bucket / Sliding Window)",
    category: "system-design",
    difficulty: "Medium",
    sheets: ["system-design-sheet"],
    leetcodeUrl: "https://leetcode.com/problems/design-hit-counter/",
    gfgUrl: "https://www.geeksforgeeks.org/system-design-rate-limiter/",
    timeComplexity: "O(1) per request",
    spaceComplexity: "O(N clients)",
    summary: "Architect a scalable rate limiter to prevent API abuse and DDoS attacks across microservices.",
    approach: "Use Token Bucket algorithm: Maintain bucket capacity `C` and refill rate `R` tokens/sec. For each request, calculate elapsed time, add tokens, check if tokens >= 1, decrement and allow request.",
    hints: [
      "Consider multi-instance distributed rate limiting using Redis sliding window logs.",
      "Handle race conditions with Redis Lua scripts or atomic operations.",
      "Choose HTTP status 429 Too Many Requests with Retry-After header."
    ],
    codeSnippets: {
      cpp: `// Token Bucket Rate Limiter Class\nclass TokenBucket {\n    double capacity, tokens, refillRate;\n    chrono::steady_clock::time_point lastRefill;\npublic:\n    TokenBucket(double cap, double rate) : capacity(cap), tokens(cap), refillRate(rate) {\n        lastRefill = chrono::steady_clock::now();\n    }\n    bool allowRequest() {\n        auto now = chrono::steady_clock::now();\n        double elapsed = chrono::duration<double>(now - lastRefill).count();\n        tokens = min(capacity, tokens + elapsed * refillRate);\n        lastRefill = now;\n        if (tokens >= 1.0) {\n            tokens -= 1.0;\n            return true;\n        }\n        return false;\n    }\n};`,
      java: `public class TokenBucketRateLimiter {\n    private final long capacity;\n    private final double refillRatePerSec;\n    private double tokens;\n    private long lastRefillTimestamp;\n\n    public TokenBucketRateLimiter(long capacity, double refillRatePerSec) {\n        this.capacity = capacity;\n        this.refillRatePerSec = refillRatePerSec;\n        this.tokens = capacity;\n        this.lastRefillTimestamp = System.currentTimeMillis();\n    }\n\n    public synchronized boolean allowRequest() {\n        long now = System.currentTimeMillis();\n        double elapsedSeconds = (now - lastRefillTimestamp) / 1000.0;\n        tokens = Math.min(capacity, tokens + elapsedSeconds * refillRatePerSec);\n        lastRefillTimestamp = now;\n        if (tokens >= 1) {\n            tokens -= 1;\n            return true;\n        }\n        return false;\n    }\n}`,
      python: `import time\n\nclass TokenBucket:\n    def __init__(self, capacity: int, refill_rate: float):\n        self.capacity = capacity\n        self.refill_rate = refill_rate\n        self.tokens = float(capacity)\n        self.last_refill = time.time()\n\n    def allow_request(self) -> bool:\n        now = time.time()\n        elapsed = now - self.last_refill\n        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)\n        self.last_refill = now\n        if self.tokens >= 1.0:\n            self.tokens -= 1.0\n            return True\n        return False`,
      javascript: `class TokenBucket {\n  constructor(capacity, refillRate) {\n    this.capacity = capacity;\n    this.refillRate = refillRate;\n    this.tokens = capacity;\n    this.lastRefill = Date.now();\n  }\n  allowRequest() {\n    const now = Date.now();\n    const elapsedSec = (now - this.lastRefill) / 1000;\n    this.tokens = Math.min(this.capacity, this.tokens + elapsedSec * this.refillRate);\n    this.lastRefill = now;\n    if (this.tokens >= 1) {\n      this.tokens -= 1;\n      return true;\n    }\n    return false;\n  }\n}`
    }
  }
];
