export const CODE_SHOWCASES = [
    {
        title: "Advanced RAG Pipeline with Vector Search & LLM Orchestration",
        description: "Production-grade Retrieval-Augmented Generation system with semantic chunking, hybrid search, and multi-agent workflows",
        tags: ["RAG", "Vector DB", "LangChain", "OpenAI", "Pinecone", "Redis"],
        language: "typescript",
        code: `// Advanced RAG Pipeline with Multi-Agent Orchestration
import { OpenAI } from "openai";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "redis";
import { z } from "zod";

interface RAGConfig {
  vectorStore: PineconeStore;
  llm: OpenAI;
  cache: ReturnType<typeof createClient>;
  embeddingModel: OpenAIEmbeddings;
}

class AdvancedRAGPipeline {
  private config: RAGConfig;
  private semanticRouter: SemanticRouter;
  private queryRewriter: QueryRewriter;
  
  constructor(config: RAGConfig) {
    this.config = config;
    this.semanticRouter = new SemanticRouter(config.embeddingModel);
    this.queryRewriter = new QueryRewriter(config.llm);
  }

  async processQuery(query: string, context?: AgentContext): Promise<RAGResponse> {
    // Multi-step query processing with semantic routing
    const routingResult = await this.semanticRouter.route(query);
    const rewrittenQueries = await this.queryRewriter.expandQuery(query, routingResult);
    
    // Parallel retrieval with fusion scoring
    const retrievalPromises = rewrittenQueries.map(async (q) => {
      const cacheKey = await this.generateCacheKey(q, context);
      const cached = await this.config.cache.get(cacheKey);
      if (cached) return JSON.parse(cached);
      
      return this.hybridRetrieval(q, {
        alpha: 0.7, // Vector search weight
        beta: 0.3,  // Keyword search weight
        minSimilarity: 0.75,
        maxResults: 20
      });
    });
    
    const retrievalResults = await Promise.all(retrievalPromises);
    const fusedResults = this.fusionRanking(retrievalResults, rewrittenQueries);
    
    // Context-aware generation with citation tracking
    return this.generateWithCitations(query, fusedResults, context);
  }

  private async hybridRetrieval(query: string, params: RetrievalParams) {
    const [vectorResults, keywordResults] = await Promise.all([
      this.vectorSearch(query, params.maxResults),
      this.keywordSearch(query, params.maxResults)
    ]);
    
    // RRF (Reciprocal Rank Fusion) scoring
    return this.reciprocalRankFusion(vectorResults, keywordResults, params);
  }

  private fusionRanking(results: DocumentChunk[][], queries: string[]): DocumentChunk[] {
    const scoreMap = new Map<string, { doc: DocumentChunk; totalScore: number }>();
    
    results.forEach((resultSet, queryIndex) => {
      const queryWeight = 1 / (queryIndex + 1); // Decay for expanded queries
      
      resultSet.forEach((doc, rank) => {
        const rrf = 1 / (rank + 60); // RRF with k=60
        const existing = scoreMap.get(doc.id);
        
        if (existing) {
          existing.totalScore += rrf * queryWeight;
        } else {
          scoreMap.set(doc.id, { doc, totalScore: rrf * queryWeight });
        }
      });
    });
    
    return Array.from(scoreMap.values())
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10)
      .map(item => item.doc);
  }
}`
    },
    {
        title: "Distributed ML Training with Kubernetes & Ray",
        description: "Scalable machine learning pipeline with distributed training, hyperparameter optimization, and model serving",
        tags: ["Ray", "Kubernetes", "MLOps", "Distributed Training", "AutoML"],
        language: "python",
        code: `# Distributed ML Training Pipeline with Ray and Kubernetes
import ray
from ray import tune, train
from ray.train import ScalingConfig, RunConfig
from ray.train.huggingface import HuggingFaceTrainer
from ray.tune.schedulers import ASHAScheduler
from ray.tune.search.optuna import OptunaSearch
import torch
import transformers
from kubernetes import client, config
import asyncio
from typing import Dict, List, Optional
import wandb
from dataclasses import dataclass

@dataclass
class DistributedTrainingConfig:
    model_name: str
    dataset_path: str
    num_workers: int
    gpu_per_worker: int
    batch_size_per_worker: int
    learning_rate_range: tuple
    epochs: int
    checkpoint_freq: int

class KubernetesMLPipeline:
    def __init__(self, k8s_config_path: str, ray_cluster_config: Dict):
        config.load_kube_config(config_file=k8s_config_path)
        self.k8s_client = client.AppsV1Api()
        self.ray_config = ray_cluster_config
        
    async def setup_distributed_cluster(self) -> ray.cluster.Cluster:
        """Initialize Ray cluster on Kubernetes with auto-scaling"""
        cluster_config = {
            "cluster_name": "ml-training-cluster",
            "provider": {"type": "kubernetes", "namespace": "ml-workloads"},
            "head_node": {
                "cpu": 4,
                "memory": "16Gi", 
                "gpu": 1,
                "resources": {"CPU": 4, "memory": 16_000_000_000}
            },
            "worker_nodes": {
                "min_workers": 2,
                "max_workers": 20,
                "initial_workers": 4,
                "cpu": 8,
                "memory": "32Gi",
                "gpu": 2,
                "resources": {"CPU": 8, "memory": 32_000_000_000, "GPU": 2}
            }
        }
        
        # Deploy Ray cluster via Kubernetes operator
        await self._deploy_ray_cluster(cluster_config)
        return ray.init(address="ray://ml-training-cluster-head:10001")

    def create_training_pipeline(self, config: DistributedTrainingConfig):
        """Create distributed training pipeline with hyperparameter optimization"""
        
        def train_function(config_dict: Dict):
            import torch
            from transformers import (
                AutoTokenizer, AutoModelForSequenceClassification,
                TrainingArguments, Trainer, DataCollatorWithPadding
            )
            from datasets import load_dataset, load_metric
            
            # Multi-GPU setup within each worker
            local_rank = int(os.environ.get("LOCAL_RANK", 0))
            torch.cuda.set_device(local_rank)
            device = torch.device(f"cuda:{local_rank}")
            
            # Load and preprocess dataset with streaming
            dataset = load_dataset(
                config_dict["dataset_path"], 
                streaming=True,
                split="train"
            )
            
            tokenizer = AutoTokenizer.from_pretrained(config_dict["model_name"])
            model = AutoModelForSequenceClassification.from_pretrained(
                config_dict["model_name"],
                num_labels=config_dict["num_labels"]
            ).to(device)
            
            # Distributed data loading
            train_dataset = dataset.map(
                lambda x: tokenizer(x["text"], truncation=True, padding=True),
                batched=True,
                remove_columns=["text"]
            )
            
            # Training arguments with gradient accumulation
            training_args = TrainingArguments(
                output_dir=f"/tmp/model-{train.get_context().get_trial_id()}",
                per_device_train_batch_size=config_dict["batch_size"],
                gradient_accumulation_steps=config_dict["grad_accum_steps"],
                learning_rate=config_dict["learning_rate"],
                num_train_epochs=config_dict["epochs"],
                warmup_ratio=0.1,
                weight_decay=0.01,
                logging_steps=50,
                save_steps=config_dict["save_steps"],
                evaluation_strategy="steps",
                eval_steps=500,
                load_best_model_at_end=True,
                metric_for_best_model="f1",
                greater_is_better=True,
                dataloader_num_workers=4,
                fp16=True,  # Mixed precision training
                gradient_checkpointing=True,
                ddp_find_unused_parameters=False,
                report_to=["wandb"] if config_dict.get("use_wandb") else []
            )
            
            trainer = Trainer(
                model=model,
                args=training_args,
                train_dataset=train_dataset,
                tokenizer=tokenizer,
                data_collator=DataCollatorWithPadding(tokenizer),
                compute_metrics=self._compute_metrics
            )
            
            # Train with automatic checkpointing
            result = trainer.train()
            
            # Report metrics to Ray Tune
            train.report({
                "loss": result.training_loss,
                "eval_f1": trainer.evaluate()["eval_f1"],
                "learning_rate": config_dict["learning_rate"]
            })
            
        return train_function`
    },
    {
        title: "GPU-Accelerated Computer Vision Pipeline",
        description: "High-performance computer vision system with CUDA acceleration, real-time object detection, and distributed inference",
        tags: ["CUDA", "OpenCV", "PyTorch", "TensorRT", "Real-time", "Computer Vision"],
        language: "python",
        code: `# GPU-Accelerated Computer Vision Pipeline with TensorRT Optimization
import torch
import torchvision.transforms as transforms
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
import numpy as np
import cv2
from concurrent.futures import ThreadPoolExecutor, as_completed
import asyncio
from typing import List, Tuple, Dict, Optional
from dataclasses import dataclass
import tritonclient.grpc as grpcclient
from collections import deque
import time

@dataclass
class DetectionResult:
    class_id: int
    confidence: float
    bbox: Tuple[int, int, int, int]
    mask: Optional[np.ndarray] = None
    keypoints: Optional[List[Tuple[float, float]]] = None

class TensorRTOptimizer:
    """Optimize PyTorch models for high-performance inference with TensorRT"""
    
    def __init__(self, max_batch_size: int = 32, precision: str = "fp16"):
        self.max_batch_size = max_batch_size
        self.precision = precision
        self.logger = trt.Logger(trt.Logger.WARNING)
        
    def optimize_model(
        self, 
        onnx_path: str, 
        engine_path: str,
        input_shape: Tuple[int, int, int, int]
    ) -> None:
        """Convert ONNX model to optimized TensorRT engine"""
        
        builder = trt.Builder(self.logger)
        config = builder.create_builder_config()
        network = builder.create_network(
            1 << int(trt.NetworkDefinitionCreationFlag.EXPLICIT_BATCH)
        )
        
        # Configure optimization settings
        config.max_workspace_size = 1 << 30  # 1GB
        config.set_flag(trt.BuilderFlag.GPU_FALLBACK)
        
        if self.precision == "fp16":
            config.set_flag(trt.BuilderFlag.FP16)
        elif self.precision == "int8":
            config.set_flag(trt.BuilderFlag.INT8)
            # Add calibration dataset for INT8 quantization
            config.int8_calibrator = self._create_calibrator()
        
        # Parse ONNX model
        parser = trt.OnnxParser(network, self.logger)
        with open(onnx_path, 'rb') as model:
            if not parser.parse(model.read()):
                for error in range(parser.num_errors):
                    print(parser.get_error(error))
                raise RuntimeError("Failed to parse ONNX model")
        
        # Build and serialize engine
        profile = builder.create_optimization_profile()
        profile.set_shape(
            "input", 
            min=input_shape, 
            opt=input_shape, 
            max=input_shape
        )
        config.add_optimization_profile(profile)
        
        engine = builder.build_engine(network, config)
        with open(engine_path, 'wb') as f:
            f.write(engine.serialize())

class GPUAcceleratedDetector:
    """High-performance object detection with GPU acceleration"""
    
    def __init__(
        self, 
        engine_path: str,
        device_id: int = 0,
        max_batch_size: int = 16
    ):
        self.device_id = device_id
        self.max_batch_size = max_batch_size
        
        # Initialize CUDA context
        cuda.init()
        self.cuda_ctx = cuda.Device(device_id).make_context()
        
        # Load TensorRT engine
        self.runtime = trt.Runtime(trt.Logger(trt.Logger.WARNING))
        with open(engine_path, 'rb') as f:
            self.engine = self.runtime.deserialize_cuda_engine(f.read())
        self.context = self.engine.create_execution_context()
        
        # Allocate GPU memory
        self.inputs, self.outputs, self.bindings = self._allocate_buffers()
        
        # Create CUDA stream for async execution
        self.stream = cuda.Stream()
        
        # Pre-processing pipeline
        self.transform = transforms.Compose([
            transforms.Resize((640, 640)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        
    def _allocate_buffers(self):
        inputs = []
        outputs = []
        bindings = []
        
        for binding in self.engine:
            size = trt.volume(self.engine.get_binding_shape(binding)) * \\
                   self.max_batch_size
            dtype = trt.nptype(self.engine.get_binding_dtype(binding))
            
            # Allocate host and device buffers
            host_mem = cuda.pagelocked_empty(size, dtype)
            device_mem = cuda.mem_alloc(host_mem.nbytes)
            
            bindings.append(int(device_mem))
            
            if self.engine.binding_is_input(binding):
                inputs.append({'host': host_mem, 'device': device_mem})
            else:
                outputs.append({'host': host_mem, 'device': device_mem})
                
        return inputs, outputs, bindings
    
    async def detect_batch(self, images: List[np.ndarray]) -> List[List[DetectionResult]]:
        """Process batch of images for object detection"""
        batch_size = min(len(images), self.max_batch_size)
        
        # Preprocess images in parallel
        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = [
                executor.submit(self._preprocess_image, img) 
                for img in images[:batch_size]
            ]
            preprocessed = [f.result() for f in as_completed(futures)]
        
        # Prepare batch tensor
        batch_tensor = torch.stack(preprocessed).cuda(self.device_id)
        
        # Copy to GPU
        np.copyto(self.inputs[0]['host'], batch_tensor.cpu().numpy().ravel())
        cuda.memcpy_htod_async(
            self.inputs[0]['device'], 
            self.inputs[0]['host'], 
            self.stream
        )
        
        # Run inference
        self.context.execute_async_v2(
            bindings=self.bindings, 
            stream_handle=self.stream.handle
        )
        
        # Copy results back to host
        for output in self.outputs:
            cuda.memcpy_dtoh_async(output['host'], output['device'], self.stream)
        
        self.stream.synchronize()
        
        # Post-process results
        detections = []
        for i in range(batch_size):
            batch_detections = self._postprocess_detections(
            detections.append(batch_detections)
            
        return detections`
    },
    {
        title: "Interactive 3D Scene with Three.js & React",
        description: "Advanced 3D visualization with custom shaders, post-processing effects, and physics integration",
        tags: ["Three.js", "WebGL", "GLSL", "React", "3D Graphics", "Shaders"],
        language: "typescript",
        code: `// Advanced Three.js Scene with Custom Shaders and Physics
import * as THREE from 'three';
import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture, shaderMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { Physics, useSphere, useBox } from '@react-three/cannon';
import { extend } from '@react-three/fiber';

// Custom shader material for advanced visual effects
const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.5, 0.0, 1.0),
    uTexture: new THREE.Texture(),
    uFrequency: 5.0,
    uAmplitude: 0.5,
  },
  // Vertex Shader
  \`
    uniform float uTime;
    uniform float uFrequency;
    uniform float uAmplitude;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Wave displacement
      vec3 pos = position;
      float wave = sin(pos.x * uFrequency + uTime) * 
                   cos(pos.z * uFrequency + uTime) * uAmplitude;
      pos.y += wave;
      
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  \`,
  // Fragment Shader
  \`
    uniform vec3 uColor;
    uniform sampler2D uTexture;
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      // Fresnel effect
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
      
      // Animated texture sampling
      vec2 animatedUv = vUv + vec2(sin(uTime * 0.5), cos(uTime * 0.3)) * 0.1;
      vec4 texColor = texture2D(uTexture, animatedUv);
      
      // Combine effects
      vec3 color = mix(uColor, texColor.rgb, 0.5);
      color += fresnel * vec3(0.5, 0.8, 1.0);
      
      gl_FragColor = vec4(color, 1.0);
    }
  \`
);

extend({ WaveShaderMaterial });

// Animated mesh with custom shader
function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const texture = useTexture('/textures/gradient.jpg');
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[5, 5, 64, 64]} />
      <waveShaderMaterial
        ref={materialRef}
        uTexture={texture}
        uFrequency={3.0}
        uAmplitude={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Physics-enabled interactive objects
function PhysicsBox({ position }: { position: [number, number, number] }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 1],
  }));
  
  const handleClick = () => {
    api.velocity.set(0, 5, 0);
    api.angularVelocity.set(
      Math.random() * 10,
      Math.random() * 10,
      Math.random() * 10
    );
  };
  
  return (
    <mesh ref={ref as any} onClick={handleClick} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#7042f8" 
        metalness={0.8} 
        roughness={0.2} 
      />
    </mesh>
  );
}

// Main scene component
export default function Advanced3DScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 10], fov: 75 }}
      gl={{ 
        antialias: true, 
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2 
      }}
    >
      <color attach="background" args={['#030014']} />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00d8ff" />
      
      {/* Physics world */}
      <Physics gravity={[0, -9.81, 0]}>
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        
        {/* Interactive physics objects */}
        {Array.from({ length: 5 }).map((_, i) => (
          <PhysicsBox key={i} position={[i * 2 - 4, 5 + i, 0]} />
        ))}
      </Physics>
      
      {/* Custom shader mesh */}
      <AnimatedMesh />
      
      {/* Environment and controls */}
      <Environment preset="night" />
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={20}
      />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={0.5} 
          luminanceThreshold={0.9} 
          luminanceSmoothing={0.9} 
        />
        <DepthOfField 
          focusDistance={0.01} 
          focalLength={0.05} 
          bokehScale={3} 
        />
        <Vignette offset={0.3} darkness={0.5} />
      </EffectComposer>
    </Canvas>
  );
}`
    }
];
