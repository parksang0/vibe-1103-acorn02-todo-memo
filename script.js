const STORAGE_KEY = 'todo-memos';

const memoInput = document.getElementById('memoInput');
const addBtn = document.getElementById('addBtn');
const memoList = document.getElementById('memoList');
const countText = document.getElementById('countText');

function getMemos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveMemos(memos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  updateCount(memos.length);
}

function updateCount(count) {
  countText.textContent = `${count}개의 메모`;
}

function createMemoItem(text, id) {
  const li = document.createElement('li');
  li.className = 'memo-item';
  li.dataset.id = id;

  const span = document.createElement('span');
  span.className = 'memo-text';
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'btn btn-delete';
  deleteBtn.textContent = '삭제';
  deleteBtn.addEventListener('click', () => removeMemo(id));

  li.appendChild(span);
  li.appendChild(deleteBtn);
  return li;
}

function renderList(memos) {
  memoList.innerHTML = '';

  if (memos.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = '아직 메모가 없습니다. 위에서 입력 후 추가해 보세요.';
    memoList.appendChild(empty);
    return;
  }

  memos.forEach((memo) => {
    memoList.appendChild(createMemoItem(memo.text, memo.id));
  });
}

function addMemo() {
  const text = memoInput.value.trim();
  if (!text) return;

  const memos = getMemos();
  const newMemo = {
    id: Date.now().toString(),
    text: text,
  };
  memos.push(newMemo);
  saveMemos(memos);
  renderList(memos);

  memoInput.value = '';
  memoInput.focus();
}

function removeMemo(id) {
  const memos = getMemos().filter((m) => m.id !== id);
  saveMemos(memos);
  renderList(memos);
}

addBtn.addEventListener('click', addMemo);
memoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addMemo();
});

// 초기 로드
const initialMemos = getMemos();
renderList(initialMemos);
updateCount(initialMemos.length);
