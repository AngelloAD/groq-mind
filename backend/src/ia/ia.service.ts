
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';

@Injectable()
export class IaService {
    private groq: Groq;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('GROQ_API_KEY');
        this.groq = new Groq({ apiKey });
    }

    async generarTexto(prompt: string): Promise<string> {
        try {
            const chatCompletion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                // Usamos el modelo estable actual recomendado por Groq
                model: 'openai/gpt-oss-20b',
            });

            // CORRECCIÓN DE INDICE: Extraemos el contenido de la primera opción ([0]) del arreglo
            return chatCompletion.choices?.[0]?.message?.content || 'Sin respuesta';
        } catch (error) {
            const mensajeError = error instanceof Error ? error.message : 'Error desconocido';
            console.error('Detalle del error en Groq:', error);
            throw new Error(`Error con Groq: ${mensajeError}`);
        }
    }
}