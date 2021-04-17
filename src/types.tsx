// All arrays are semi-colon separated strings.
export interface ME3TweaksINI {
    ModManager?: {
        cmmver?: number;
        minbuild?: number;
    }
    ModInfo: {
        game?: string;
        modname: string;
        moddesc?: string;
        modver: string;
        moddev?: string;
        modsite?: string;
        updatecode?: string;
        nexuscode?: number;
        bannerimagename?: string;
    }
    UPDATES?: {
        serverFolder?: string;
        blacklistedfiles?: string[];
    }
    BASEGAME?: {
        moddir?: string;
        addfiles?: string[];
        addfilestargets?: string[];
        addfilesreadonlytargets?: string[];
    }
    CUSTOMDLC?: {
        sourceDirs?: string[];
        destdirs?: string[];
        mutlilist1?: string[];
        mutlilist2?: string[];
        multilist3?: string[];
        altfiles?: string;
        altdlc?: string;
    }
}