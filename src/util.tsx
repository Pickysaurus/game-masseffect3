import { types } from 'vortex-api';
import { ME3TweaksINI } from './types';

async function parseM3TweaksIniFile(iniPath: string): Promise<ME3TweaksINI> {
    // METweaks moddesc.ini files aren't "normal" INIs so we need to parse it manually. 
    return undefined;
}

function instructionsFromM3TweakIni(moddesc: ME3TweaksINI, files: string[]) {
    let instructions: types.IInstruction[] = [];
    if (moddesc.ModInfo.modname) instructions.push({ type: 'attribute', key: 'customFileName', value: moddesc.ModInfo.modname });
    if (moddesc.ModInfo.modver) instructions.push({ type: 'attribute', key: 'version', value: moddesc.ModInfo.modver });
    if (moddesc.ModInfo.moddesc) instructions.push({ type: 'attribute', key: 'description', value: moddesc.ModInfo.moddesc });
    if (moddesc.ModInfo.moddev) instructions.push({ type: 'attribute', key: 'author', value: moddesc.ModInfo.moddev });
    if (moddesc.ModInfo.nexuscode) {
        instructions.push({ type: 'attribute', key: 'modId', value: moddesc.ModInfo.nexuscode.toString() })
        instructions.push({ type: 'attribute', key: 'source', value: 'nexus' });

    };

    // Install instructions
    if (moddesc.CUSTOMDLC.sourceDirs && moddesc.CUSTOMDLC.destdirs) {
        // Filters files by sourceDir and map instructions to destdir
    };

}

export { parseM3TweaksIniFile };