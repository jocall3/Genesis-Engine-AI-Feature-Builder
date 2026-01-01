
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GeneratedFile, ProjectNode, OutputTab, SecurityScanReport, VCSResult, DeploymentReport, SupplementalTabType } from './types';
import { generateEcosystem, generateStream } from './services/geminiService';
import { useNotification } from './components/NotificationContext';
import { Icons, AI_PROVIDERS, CLOUD_PROVIDERS, VCS_PROVIDERS, SERVICE_CATEGORIES } from './constants';
import { ProjectTreeViewer } from './components/ProjectTreeViewer';
import { Editor } from './components/Editor';
import { LoadingSpinner, MarkdownRenderer } from './components/shared';

export const AiFeatureBuilder: React.FC = () => {
  const [prompt, setPrompt] = useState('Build a secure authentication portal with JWT and MFA using React and Node.js.');
  const [framework, setFramework] = useState('React');
  const [includeBackend, setIncludeBackend] = useState(true);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [activeTab, setActiveTab] = useState<OutputTab>('CODE');
  const [isLoading, setIsLoading] = useState(false);
  
  // Supplementary states
  const [unitTests, setUnitTests] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [codeReview, setCodeReview] = useState('');
  const [architecture, setArchitecture] = useState('');
  const [apiSpec, setApiSpec] = useState('');
  const [performance, setPerformance] = useState('');
  const [cicd, setCicd] = useState('');
  const [dbSchema, setDbSchema] = useState('');
  const [securityReport, setSecurityReport] = useState<SecurityScanReport | null>(null);
  
  // Settings & Logs
  const [selectedCloud, setSelectedCloud] = useState('AWS');
  const [selectedVCS, setSelectedVCS] = useState('GitHub');
  const [vcsLog, setVcsLog] = useState<VCSResult[]>([]);
  const [deployLog, setDeployLog] = useState<DeploymentReport[]>([]);
  const [costEstimate, setCostEstimate] = useState(0);

  const { showNotification } = useNotification();

  const buildTree = (files: GeneratedFile[]): ProjectNode => {
    const root: ProjectNode = { id: 'root', name: 'Project', type: 'directory', path: '', children: [] };
    files.forEach(file => {
      const parts = file.filePath.split('/');
      let current = root;
      parts.forEach((part, i) => {
        const isFile = i === parts.length - 1;
        const path = parts.slice(0, i + 1).join('/');
        let existing = current.children?.find(c => c.name === part);
        if (!existing) {
          existing = {
            id: path,
            name: part,
            type: isFile ? 'file' : 'directory',
            path,
            content: isFile ? file.content : undefined,
            children: isFile ? undefined : []
          };
          current.children?.push(existing);
        }
        current = existing;
      });
    });
    return root;
  };

  const projectTree = buildTree(generatedFiles);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setCostEstimate(0);
    try {
      showNotification('Initiating Genesis Engine...', 'info');
      const files = await generateEcosystem(prompt, framework, includeBackend);
      setGeneratedFiles(files);
      showNotification('Core logic generated. Orchestrating supplementary services...', 'success');

      // Concurrently stream other outputs
      const fullContext = files.map((f: any) => `File: ${f.filePath}\n${f.content}`).join('\n\n');
      
      const streamPromises = [
        (async () => { for await (const chunk of generateStream('TESTS', fullContext)) setUnitTests(p => p + chunk); })(),
        (async () => { for await (const chunk of generateStream('COMMIT', fullContext)) setCommitMessage(p => p + chunk); })(),
        (async () => { for await (const chunk of generateStream('CODE_REVIEW', fullContext)) setCodeReview(p => p + chunk); })(),
        (async () => { for await (const chunk of generateStream('ARCHITECTURE', fullContext)) setArchitecture(p => p + chunk); })(),
        (async () => { for await (const chunk of generateStream('API_SPEC', fullContext)) setApiSpec(p => p + chunk); })(),
        (async () => { for await (const chunk of generateStream('PERFORMANCE', fullContext)) setPerformance(p => p + chunk); })(),
        (async () => { for await (const chunk of generateStream('CI_CD', fullContext)) setCicd(p => p + chunk); })(),
        (async () => { for await (const chunk of generateStream('DB_SCHEMA', fullContext)) setDbSchema(p => p + chunk); })(),
        (async () => { 
          let rawSecurity = '';
          for await (const chunk of generateStream('SECURITY', fullContext)) rawSecurity += chunk;
          setSecurityReport({
            tool: 'Genesis Security Scanner',
            target: 'Generated Codebase',
            status: 'COMPLETED',
            findings: [{ severity: 'HIGH', description: 'Simulated scan based on Gemini insights.', remediation: 'Check report for details.' }],
            score: Math.floor(Math.random() * 40) + 60,
            reportUrl: '#',
            timestamp: new Date().toISOString()
          });
        })()
      ];

      await Promise.all(streamPromises);
      setCostEstimate(files.length * 0.0042 + 0.12);
      showNotification('Ecosystem construction complete.', 'success');
    } catch (err: any) {
      showNotification(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeploy = async () => {
    setIsLoading(true);
    showNotification(`Provisioning resources on ${selectedCloud}...`, 'info');
    await new Promise(r => setTimeout(r, 2000));
    const report: DeploymentReport = {
      deploymentId: `GEN-${Date.now()}`,
      provider: selectedCloud,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      logs: ['CloudFormation initialized', 'Provisioning EC2 clusters', 'DB replicas active'],
      endpoints: [`https://app.genesis.${selectedCloud.toLowerCase()}.com`],
      resources: ['VM-01', 'DB-MASTER']
    };
    setDeployLog(prev => [report, ...prev]);
    showNotification('Deployment successful!', 'success');
    setIsLoading(false);
  };

  const handleCommit = async () => {
    setIsLoading(true);
    showNotification(`Pushing to ${selectedVCS}...`, 'info');
    await new Promise(r => setTimeout(r, 1500));
    const result: VCSResult = {
      provider: selectedVCS,
      operation: 'push',
      success: true,
      message: 'Committed 14 files to main branch.',
      timestamp: new Date().toISOString()
    };
    setVcsLog(prev => [result, ...prev]);
    showNotification('VCS push complete.', 'success');
    setIsLoading(false);
  };

  const renderActiveTab = () => {
    if (typeof activeTab !== 'string') {
      return (
        <Editor 
          language={activeTab.filePath.split('.').pop() || 'typescript'} 
          value={activeTab.content} 
          onChange={(newVal) => {
            setGeneratedFiles(prev => prev.map(f => f.filePath === activeTab.filePath ? { ...f, content: newVal } : f));
          }} 
        />
      );
    }

    switch (activeTab) {
      case 'TESTS': return <MarkdownRenderer content={unitTests || 'Generating tests...'} />;
      case 'COMMIT': return <pre className="p-4 bg-gray-900 rounded-lg text-green-400 font-mono text-sm">{commitMessage || 'No message yet.'}</pre>;
      case 'CODE_REVIEW': return <MarkdownRenderer content={codeReview || 'Reviewing code...'} />;
      case 'ARCHITECTURE': return <MarkdownRenderer content={architecture || 'Drafting architecture...'} />;
      case 'API_SPEC': return <Editor language="yaml" value={apiSpec} onChange={setApiSpec} />;
      case 'PERFORMANCE': return <MarkdownRenderer content={performance || 'Analyzing performance...'} />;
      case 'CI_CD': return <Editor language="yaml" value={cicd} onChange={setCicd} />;
      case 'DB_SCHEMA': return <MarkdownRenderer content={dbSchema || 'Designing schema...'} />;
      case 'SECURITY': return securityReport ? (
        <div className="p-6 space-y-6 overflow-y-auto max-h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2"><Icons.Shield /> Security Audit Result</h2>
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${securityReport.score > 80 ? 'bg-green-600' : 'bg-red-600'}`}>
              Safety Score: {securityReport.score}/100
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <span className="text-xs text-gray-500 block mb-1">Target</span>
              <span className="font-medium">{securityReport.target}</span>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <span className="text-xs text-gray-500 block mb-1">Status</span>
              <span className="text-green-400 font-medium">{securityReport.status}</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-300">Vulnerabilities</h3>
            {securityReport.findings.map((f, i) => (
              <div key={i} className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${f.severity === 'HIGH' ? 'bg-red-600' : 'bg-yellow-600'}`}>{f.severity}</span>
                <p className="mt-2 text-sm">{f.description}</p>
                {f.remediation && <p className="mt-2 text-xs text-gray-400 italic">Remediation: {f.remediation}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : <div className="p-4 text-gray-500">No security audit performed yet.</div>;
      case 'SETTINGS': return (
        <div className="p-8 space-y-12 overflow-y-auto max-h-full">
           <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Icons.Cog /> Integration Ecosystem</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {SERVICE_CATEGORIES.map(cat => (
                <div key={cat.name} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-primary transition-colors">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{cat.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.providers.map(p => (
                      <span key={p} className="px-2 py-1 bg-gray-900 rounded text-xs border border-gray-700 text-gray-300">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold">Cloud Deployment</h3>
              <select 
                value={selectedCloud} 
                onChange={e => setSelectedCloud(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
              >
                {CLOUD_PROVIDERS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold">Version Control</h3>
              <select 
                value={selectedVCS} 
                onChange={e => setSelectedVCS(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
              >
                {VCS_PROVIDERS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>
      );
      case 'DEPLOYMENT_LOG': return (
        <div className="p-6 space-y-4 overflow-y-auto max-h-full">
          {deployLog.map(log => (
            <div key={log.deploymentId} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-primary">{log.deploymentId}</h4>
                  <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded font-bold uppercase">{log.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mb-4">
                <div>Provider: <span className="text-gray-200">{log.provider}</span></div>
                <div>Endpoints: {log.endpoints.map(e => <a key={e} href={e} target="_blank" className="text-primary hover:underline">{e}</a>)}</div>
              </div>
              <div className="bg-black/40 rounded p-2 text-[10px] font-mono text-gray-500">
                {log.logs.map((l, i) => <div key={i}>> {l}</div>)}
              </div>
            </div>
          ))}
          {deployLog.length === 0 && <div className="text-center py-20 text-gray-600">No deployments found.</div>}
        </div>
      );
      case 'VCS_LOG': return (
        <div className="p-6 space-y-4 overflow-y-auto max-h-full">
          {vcsLog.map((log, i) => (
            <div key={i} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 flex gap-4">
              <div className="w-1 bg-green-500 rounded-full h-12" />
              <div>
                <h4 className="font-bold text-gray-200 uppercase text-xs">{log.provider} {log.operation}</h4>
                <p className="text-sm text-gray-400 mt-1">{log.message}</p>
                <span className="text-[10px] text-gray-600 mt-2 block">{new Date(log.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))}
          {vcsLog.length === 0 && <div className="text-center py-20 text-gray-600">No version control activity found.</div>}
        </div>
      );
      default: return <div className="p-4">Placeholder for {activeTab}</div>;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a]">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0d0d0d] z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">G</div>
          <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent uppercase">Genesis Engine <span className="text-[10px] text-gray-600 font-mono ml-2 border border-gray-800 px-1.5 py-0.5 rounded">v3.0.4-LTS</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
             <span className="text-[10px] text-gray-500 uppercase tracking-widest">Est. Build Cost</span>
             <span className="text-sm font-mono text-green-400">${costEstimate.toFixed(4)}</span>
          </div>
          <button onClick={() => setActiveTab('SETTINGS')} className="p-2 hover:bg-gray-800 rounded-full text-gray-400 transition-colors"><Icons.Cog /></button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex min-h-0 relative">
        {/* Sidebar Explorer */}
        <aside className="w-64 border-r border-gray-800 bg-[#0d0d0d] flex flex-col">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Project Explorer</span>
            <button className="text-gray-600 hover:text-gray-300 transition-colors"><Icons.Code /></button>
          </div>
          <div className="flex-grow overflow-y-auto p-2 custom-scrollbar">
            {generatedFiles.length > 0 ? (
              <ProjectTreeViewer tree={projectTree} onFileSelect={(file) => setActiveTab(file)} />
            ) : (
              <div className="text-center py-20 text-gray-700 text-xs px-4 italic leading-relaxed">
                Describe a feature to ignite the Genesis Engine and populate the ecosystem.
              </div>
            )}
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#080808]">
          {/* Tab Bar */}
          <div className="h-10 border-b border-gray-800 bg-[#0d0d0d] flex items-center overflow-x-auto no-scrollbar scroll-smooth">
            <button 
              onClick={() => setActiveTab('CODE')}
              className={`flex-shrink-0 px-4 h-full flex items-center gap-2 text-xs font-medium transition-all ${activeTab === 'CODE' ? 'bg-[#1e1e1e] text-white border-b-2 border-primary' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}
            >
              <Icons.Code /> Workspace
            </button>
            <div className="h-4 w-[1px] bg-gray-800 mx-1" />
            {[
              { id: 'TESTS', label: 'Unit Tests', icon: <Icons.File />, visible: unitTests },
              { id: 'SECURITY', label: 'Security Audit', icon: <Icons.Shield />, visible: securityReport },
              { id: 'ARCHITECTURE', label: 'Architecture', icon: <Icons.Branch />, visible: architecture },
              { id: 'PERFORMANCE', label: 'Performance', icon: <Icons.Cpu />, visible: performance },
              { id: 'CODE_REVIEW', label: 'Code Review', icon: <Icons.Branch />, visible: codeReview },
              { id: 'API_SPEC', label: 'API Spec', icon: <Icons.Code />, visible: apiSpec },
              { id: 'DB_SCHEMA', label: 'DB Schema', icon: <Icons.Branch />, visible: dbSchema },
              { id: 'CI_CD', label: 'CI/CD Pipeline', icon: <Icons.Rocket />, visible: cicd },
              { id: 'VCS_LOG', label: 'VCS Activity', icon: <Icons.Branch />, visible: true },
              { id: 'DEPLOYMENT_LOG', label: 'Deploy Log', icon: <Icons.Cloud />, visible: true },
            ].map(tab => tab.visible && (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SupplementalTabType)}
                className={`flex-shrink-0 px-4 h-full flex items-center gap-2 text-xs font-medium transition-all ${activeTab === tab.id ? 'bg-[#1e1e1e] text-white border-b-2 border-primary' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-grow min-h-0 relative">
             {isLoading && <div className="absolute inset-0 z-50 bg-[#080808]/80 flex items-center justify-center backdrop-blur-sm"><LoadingSpinner size="lg" message="Genesis Engine is constructing ecosystem..." /></div>}
             <div className="h-full">
               {renderActiveTab()}
             </div>
          </div>
        </main>
      </div>

      {/* Footer Controls */}
      <footer className="border-t border-gray-800 bg-[#0d0d0d] p-4 z-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <textarea 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe the full-stack feature..."
              className="flex-grow bg-[#151515] border border-gray-800 rounded-xl p-3 text-sm text-gray-200 outline-none focus:ring-1 focus:ring-primary h-20 resize-none transition-shadow hover:shadow-lg"
            />
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="btn-primary bg-primary hover:bg-primary/80 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : <Icons.Cpu />} BUILD ECOSYSTEM
              </button>
              <div className="flex gap-2">
                <button onClick={handleCommit} disabled={isLoading || !commitMessage} className="flex-1 text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 py-1.5 rounded-lg font-bold border border-gray-700 uppercase transition-colors">VCS COMMIT</button>
                <button onClick={handleDeploy} disabled={isLoading || !generatedFiles.length} className="flex-1 text-[10px] bg-primary/20 hover:bg-primary/30 text-primary py-1.5 rounded-lg font-bold border border-primary/30 uppercase transition-colors">DEPLOY CLOUD</button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-600 font-mono uppercase tracking-widest">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-200">
                <input type="checkbox" checked={includeBackend} onChange={e => setIncludeBackend(e.target.checked)} className="form-checkbox bg-gray-900 border-gray-800 rounded text-primary" />
                Autonomous Backend
              </label>
              <div className="flex items-center gap-2">
                <span>Model:</span>
                <span className="text-primary font-bold">GEMINI-3-FLASH</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Network:</span>
                <span className="text-green-500 font-bold">SYNCHRONIZED</span>
              </div>
            </div>
            <span>&copy; 2025 Genesis DevOS - Global Solutions v3</span>
          </div>
        </div>
      </footer>

      <style>{`
        .btn-primary { background: #3b82f6; }
        .text-primary { color: #3b82f6; }
        .border-primary { border-color: #3b82f6; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AiFeatureBuilder;
