import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        return '/editor.worker.bundle.js';
    }
};
