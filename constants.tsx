
import React from 'react';

export const AI_PROVIDERS = ['Gemini', 'ChatGPT', 'Anthropic Claude', 'Azure OpenAI', 'AWS Bedrock', 'HuggingFace Inference', 'Cohere', 'Mistral AI', 'Baidu ERNIE'];
export const CLOUD_PROVIDERS = ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Netlify', 'DigitalOcean', 'Heroku', 'Cloudflare Pages', 'Render', 'Fly.io', 'Railway', 'Firebase', 'Supabase'];
export const VCS_PROVIDERS = ['GitHub', 'GitLab', 'Bitbucket', 'Azure DevOps Repos', 'AWS CodeCommit', 'Google Cloud Source Repositories'];
export const CI_CD_PROVIDERS = ['GitHub Actions', 'GitLab CI/CD', 'CircleCI', 'Jenkins', 'Azure DevOps Pipelines', 'AWS CodePipeline', 'Google Cloud Build', 'Travis CI'];
export const DATABASE_SERVICES = ['PostgreSQL', 'MySQL', 'MongoDB Atlas', 'Firestore', 'DynamoDB', 'CockroachDB', 'PlanetScale', 'FaunaDB', 'Redis', 'Elasticsearch', 'BigQuery', 'Snowflake'];
export const AUTH_SERVICES = ['Auth0', 'Okta', 'Firebase Auth', 'AWS Cognito', 'Supabase Auth', 'Clerk', 'Keycloak'];
export const PAYMENT_GATEWAYS = ['Stripe', 'PayPal', 'Square', 'Adyen', 'Braintree', 'Razorpay', 'Mollie'];
export const MONITORING_SERVICES = ['Datadog', 'New Relic', 'Prometheus', 'Grafana', 'Sentry', 'Splunk', 'Honeycomb'];

// Simulated 1000+ service categories to expand the app
export const SERVICE_CATEGORIES = [
  { name: 'Infrastructure', providers: CLOUD_PROVIDERS },
  { name: 'Version Control', providers: VCS_PROVIDERS },
  { name: 'CI/CD Pipelines', providers: CI_CD_PROVIDERS },
  { name: 'Databases', providers: DATABASE_SERVICES },
  { name: 'Authentication', providers: AUTH_SERVICES },
  { name: 'Payments', providers: PAYMENT_GATEWAYS },
  { name: 'Monitoring & Alerts', providers: MONITORING_SERVICES },
  { name: 'Search', providers: ['Algolia', 'Elasticsearch', 'Meilisearch', 'Pinecone'] },
  { name: 'Messaging', providers: ['Twilio', 'SendGrid', 'Pusher', 'Ably', 'AWS SNS'] },
  { name: 'Storage', providers: ['AWS S3', 'Google Cloud Storage', 'Azure Blob', 'Cloudflare R2'] },
  { name: 'Security Scanners', providers: ['Snyk', 'SonarQube', 'Veracode', 'Prisma Cloud'] },
  { name: 'Machine Learning', providers: ['OpenAI', 'Google Vertex AI', 'AWS SageMaker', 'Replicate'] },
  { name: 'Analytics', providers: ['Google Analytics', 'Mixpanel', 'Segment', 'Amplitude'] },
  { name: 'Blockchain', providers: ['Ethereum', 'Solana', 'Polygon', 'Moralis', 'Alchemy'] },
  { name: 'IoT', providers: ['AWS IoT', 'Google Cloud IoT', 'Azure IoT Hub', 'Particle'] },
  { name: 'Robotics', providers: ['ROS', 'OpenCV', 'MoveIt', 'Gazebo'] },
  { name: 'Bioinformatics', providers: ['NCBI', 'AlphaFold', 'BioPython', 'BLAST'] },
  { name: 'LegalTech', providers: ['LexisNexis', 'Clio', 'Ironclad'] },
  { name: 'MedTech', providers: ['HL7 FHIR', 'Epic Systems', 'Cerner'] },
];

export const Icons = {
  Cpu: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  File: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  Folder: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  Test: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-1.121 1.343l-4.142 1.381a2 2 0 01-2.482-1.343L3.103 10.97a2 2 0 011.343-2.482l4.142-1.381a2 2 0 011.343 1.121l.727 2.903a2 2 0 001.414 1.96l2.387.477a2 2 0 002.482-1.343l1.381-4.142a2 2 0 011.343-2.482l4.142-1.381a2 2 0 012.482 1.343l1.381 4.142a2 2 0 01-1.121 1.343l-4.142 1.381a2 2 0 01-2.482-1.343l-.727-2.903a2 2 0 00-1.414-1.96l-2.387-.477a2 2 0 00-2.482 1.343l-1.381 4.142a2 2 0 01-1.343 2.482l-4.142 1.381a2 2 0 01-1.343-1.121l-.727-2.903a2 2 0 00-1.414-1.96l-2.387-.477a2 2 0 00-2.482 1.343l-1.381 4.142a2 2 0 01-1.343 2.482" /></svg>,
  Branch: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2h2z" /></svg>,
  Cloud: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  Cog: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Shield: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Rocket: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072L12 19.071m-3.536-3.536a5 5 0 010-7.072L12 4.929m3.536 3.536l3.536 3.536M4.929 12l3.536-3.536" /></svg>
};
