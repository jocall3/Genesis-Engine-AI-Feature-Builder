
export interface GeneratedFile {
  filePath: string;
  content: string;
}

export interface ProjectNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  path: string;
  content?: string;
  children?: ProjectNode[];
  status?: 'new' | 'modified' | 'deleted';
}

export type SupplementalTabType = 
  | 'TESTS' | 'COMMIT' | 'DEPLOYMENT' | 'CODE_REVIEW' | 'ARCHITECTURE' 
  | 'API_SPEC' | 'SECURITY' | 'PERFORMANCE' | 'CI_CD' | 'DB_SCHEMA' 
  | 'SETTINGS' | 'HISTORY' | 'VCS_LOG' | 'DEPLOYMENT_LOG';

export type OutputTab = GeneratedFile | SupplementalTabType;

export interface SecurityScanReport {
  tool: string;
  target: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  findings: Array<{ severity: string; description: string; cwe?: string; remediation?: string }>;
  score: number;
  reportUrl: string;
  timestamp: string;
}

export interface VCSResult {
  provider: string;
  operation: string;
  success: boolean;
  message: string;
  details?: any;
  timestamp: string;
}

export interface DeploymentReport {
  deploymentId: string;
  provider: string;
  status: 'SUCCESS' | 'FAILURE' | 'PENDING';
  timestamp: string;
  logs: string[];
  endpoints: string[];
  resources: string[];
}
