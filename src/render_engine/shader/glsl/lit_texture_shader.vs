#version 300 es
layout(location=0)in vec3 aPosition;
layout(location=1)in vec3 aNormal;
layout(location=3)in vec2 aTexCoords;

out vec3 normal;
out vec3 toSun;
out vec3 toCamera;
out vec2 texCoords;
out float fogFactor;

uniform mat4 tranformationMat;

layout(std140)uniform GlobalVSData{
	mat4 projectionMat;
	mat4 viewMat;
	vec3 cameraPosition;
	vec3 sunPosition;
	vec2 fogDensityGradient;
};

void main(void){
	vec4 worldposition=tranformationMat*vec4(aPosition,1.f);
	gl_Position=projectionMat*viewMat*worldposition;
	normal=mat3(tranformationMat)*aNormal;
	toSun=sunPosition-worldposition.xyz;
	toCamera=cameraPosition-worldposition.xyz;
	texCoords=aTexCoords;
	float distance=length(toCamera);
	fogFactor=exp(-pow((distance*fogDensityGradient.x),fogDensityGradient.y));
}