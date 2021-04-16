import * as path from 'path';

// COMMONLY USED FILE PATHS AND VARIABLES

const GAME_ID: string = 'masseffect3';
const STEAMAPP_ID: string = '1238020';
const ORIGINAPP_ID: string = 'DR:229644400';

const FILE_TYPES: string[] = ['.afc', '.bin', '.cnd', '.pcc', '.tfc', '.tlk', '.upk'];

// GamePaths
const ASIPATH: (gamePath: string) => string = (gamePath: string) => path.join(gamePath, 'Binaries', 'Win32', 'asi');
const DLCPATH: (gamePath: string) => string = (gamePath: string) => path.join(gamePath, 'BIOGame', 'DLC');
const COOKEDPATH: (gamePath: string) => string = (gamePath: string) => path.join(gamePath, 'BIOGame', 'CookedPCConsole');

// Game Asset Paths
const ME3_AUTOTOC: (gamePath: string) => string = (gamePath) => path.join(gamePath, 'Binaries', 'Win32', 'asi', 'AutoTOC-v2.1.asi');
const ME3_BINKW32: (gamePath: string) => string = (gamePath) => path.join(gamePath, 'Binaries', 'Win32', 'binkw23.dll');

// Bundled Asset paths
const ME3_AUTOTOCBINK = path.join(__dirname, 'content', 'ME3');

export { 
    GAME_ID, STEAMAPP_ID, ORIGINAPP_ID, ME3_AUTOTOCBINK, FILE_TYPES,
    ME3_AUTOTOC, ME3_BINKW32, DLCPATH, COOKEDPATH, ASIPATH
};