export interface AccessACL {
    course?: number,
    role?: string,
    username?: string,
    view?: boolean,
    read?: boolean,
    write?: boolean
}

export interface ACLTable {
    meta: {
        owner?: string,
        created?: Date
    },
    access: AccessACL[]
}

export interface ListFilesOptions {
    dotfiles?: boolean,
    exts?: string[],
    hidedirs?: boolean,
    hidefiles?: boolean,
    recursive?: boolean,
    includeAcls?: boolean
}

export interface TreeNodeData {
    name: string,
    fullpath?: string,
    acl?: ACLTable
    size?: number,
    type: string,
    erasable?: boolean,
    readable?: boolean,
    writetable?: boolean,
    content?: any
}

export interface TreeNode {
    label?: string
    data?: TreeNodeData,
    children?: TreeNode[]
    icon?: string
    expandedIcon?: string
    collapsedIcon?: string
    leaf?: boolean
    style?: string
    styleClass?: string
    expanded?: boolean
    parent?: TreeNode
    draggable?: boolean
    droppable?: boolean
    selectable?: boolean
    emptyMessage?: string
}

export interface FilemanagerResponse {
    err?: string;
    node?: TreeNode
}

export interface IdentityACL {
    username?: string;
    role?: string;
    courses?: number[]
}