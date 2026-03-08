const STORAGE_KEY = 'todo-memos';

const memoInput = document.getElementById('memoInput');
const memoTypeSelect = document.getElementById('memoType');
const addBtn = document.getElementById('addBtn');
const memoList = document.getElementById('memoList');
const countText = document.getElementById('countText');

const TYPE_LABELS = {
  work: '업무',
  personal: '개인',
  study: '학습',
  other: '기타',
};

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

function createMemoItem(text, id, typeKey = 'other') {
  const safeTypeKey = TYPE_LABELS[typeKey] ? typeKey : 'other';
  const typeLabel = TYPE_LABELS[safeTypeKey];

  const li = document.createElement('li');
  li.className = 'memo-item';
  li.dataset.id = id;
  li.dataset.type = safeTypeKey;

  const main = document.createElement('div');
  main.className = 'memo-main';

  const typeBadge = document.createElement('span');
  typeBadge.className = `memo-type type-${safeTypeKey}`;
  typeBadge.textContent = typeLabel;

  const span = document.createElement('span');
  span.className = 'memo-text';
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'btn btn-delete';
  deleteBtn.textContent = '삭제';
  deleteBtn.addEventListener('click', () => removeMemo(id));

  main.appendChild(typeBadge);
  main.appendChild(span);
  li.appendChild(main);
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
    memoList.appendChild(createMemoItem(memo.text, memo.id, memo.type || 'other'));
  });
}

function addMemo() {
  const text = memoInput.value.trim();
  if (!text) return;

  const typeKey = memoTypeSelect?.value || 'other';

  const memos = getMemos();
  const newMemo = {
    id: Date.now().toString(),
    text: text,
    type: typeKey,
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
