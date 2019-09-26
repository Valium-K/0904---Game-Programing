/////////////////////////// 전역변수 ///////////////////////////////////////////////

// MAP 상수
const TILE_SIZE = 32; // Default: 32;
const STROKE_SIZE = TILE_SIZE / 10; // 테두리 사이즈
const TILE_NUM = 15; // 타일 수
const MAP_SIZE = TILE_SIZE * TILE_NUM; // 맵 사이즈
const MAP_COLOR = "#303840";
const MAP_COLOR_HARD = "#403030"

const MAP_STROKE_COLOR = "#202830";
const MAP_STROKE_COLOR_HARD = "#302020";

// 지렁이 상수
const SNAKE_SPEED = 250 * 0.5; // 지렁이 스피드
const SNAKE_HEAD_COLOR = "#00ff44"; // 지렁이 머리 색상
const SNAKE_TAIL_COLOR = "#009919"; // 지렁이 꼬리 색상

// 아이템 상수
const ITEM_SPAWN_RANDOM_NUM = 70; // 아이템이 이 랜덤수와 같아야 스폰됨
const LENGTH_FOR_ITEM_SPAWN = 10; // SNAKE가 해당 길이 이상일때 아이템 스폰됨
const ITEM_VALUE = 3; // 아이템이 지울 꼬리 길이
const ITEM_COLOR = "#ffca57";
const ITEM_TIMEOUT = 5000;

// FRUIT 상수
const FRUIT_COLOR = "#d90000";

// AUDIO 상수
const FRUIT_EAT = './assets/sfx/fruiteat.ogg';
const ITEM_EAT = './assets/sfx/itemeat.ogg';
const SPAWN = './assets/sfx/spawn.ogg';
const DEAD = './assets/sfx/dead.ogg';

const INGAME = './assets/ingame.mp3';
const RESULT = './assets/result.mp3';

/////////////////////////////////////////////////////////////////////////////////